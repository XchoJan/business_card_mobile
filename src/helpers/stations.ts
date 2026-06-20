import Api from '../Api';

export type MapStationPin = {
  id: number | string;
  name: string;
  brand?: string;
  address?: string;
  latitude: number;
  longitude: number;
  is_available?: boolean;
  type?: number;
  fuels?: { type: string; price: number | null }[];
  schedule?: string;
  services?: string[];
  description?: string;
  pumps?: any[];
  payment_methods?: any[];
  metadata?: any[];
  loading?: boolean;
  [key: string]: any;
};

export const extractApiData = <T = any>(response: any): T | null => {
  const body = response?.data;
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T;
  }
  return (body ?? null) as T | null;
};

export const regionToStationBounds = (region: {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}) => ({
  north_east_lat: region.latitude + region.latitudeDelta / 2,
  south_west_lat: region.latitude - region.latitudeDelta / 2,
  north_east_lng: region.longitude + region.longitudeDelta / 2,
  south_west_lng: region.longitude - region.longitudeDelta / 2,
  limit: 1000,
});

export const mapStationPinFromApi = (station: any): MapStationPin | null => {
  const latitude = Number(
    station?.coordinate?.latitude ?? station?.latitude,
  );
  const longitude = Number(
    station?.coordinate?.longitude ?? station?.longitude,
  );

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const brandName =
    typeof station?.brand === 'object' && station?.brand !== null
      ? station.brand.name
      : station?.brand;

  return {
    ...station,
    id: station?.id,
    name: station?.name ?? brandName ?? 'АЗС',
    brand: brandName,
    address: station?.address ?? '',
    latitude,
    longitude,
    is_available: station?.is_available,
  };
};

const getMetadataValue = (metadata: any[], keys: string[]) => {
  const item = metadata.find(m => keys.includes(m?.key));
  return item?.value ?? '';
};

const buildDescriptionFromMetadata = (metadata: any[]) => {
  const about = metadata
    .filter(m => m?.section === 'about' || m?.section === 'info')
    .sort((a, b) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0))
    .map(m => m?.value)
    .filter(Boolean);

  if (about.length) return about.join('\n');

  const fallback = getMetadataValue(metadata, ['description', 'about', 'info']);
  return fallback || '';
};

const buildScheduleFromMetadata = (metadata: any[]) => {
  const scheduleRows = metadata
    .filter(m => m?.section === 'schedule' || m?.key === 'schedule')
    .sort((a, b) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0))
    .map(m => (m?.label && m?.value ? `${m.label}: ${m.value}` : m?.value))
    .filter(Boolean);

  if (scheduleRows.length) return scheduleRows.join('\n');

  return getMetadataValue(metadata, [
    'schedule',
    'working_hours',
    'opening_hours',
  ]);
};

export const fetchFuelsWithPrices = async (
  stationId: number | string,
  pumps: any[],
  services: any[],
) => {
  const activePump =
    pumps.find(p => p?.active) ?? pumps.find(p => p?.status === 'active') ?? pumps[0];

  if (!activePump) return [];

  const pumpRef = activePump.uuid ?? activePump.id;
  const pumpServices =
    Array.isArray(activePump.services) && activePump.services.length
      ? activePump.services
      : services;

  const fuels = await Promise.all(
    pumpServices.map(async (service: any) => {
      const serviceRef = service.uuid ?? service.id;
      try {
        const response = await Api.getStationPrice(
          stationId,
          pumpRef,
          serviceRef,
        );
        const priceData = extractApiData<any>(response);
        const price = priceData?.retail_price ?? priceData?.price ?? null;

        return {
          type: priceData?.name ?? service?.name ?? 'Топливо',
          price,
          service_id: service?.id,
          pump_id: activePump?.id,
          currency: priceData?.currency_code ?? priceData?.currency ?? '֏',
        };
      } catch (e: any) {
        console.warn('[Station] price error', {
          stationId,
          pumpRef,
          serviceRef,
          status: e?.response?.status,
          data: e?.response?.data,
        });
        return {
          type: service?.name ?? 'Топливо',
          price: null,
          service_id: service?.id,
          pump_id: activePump?.id,
        };
      }
    }),
  );

  return fuels.filter(f => f.price !== null && f.price !== undefined);
};

export const fetchStationCardData = async (
  stationId: number | string,
): Promise<MapStationPin> => {
  console.log('[Station] detail start', { stationId });

  const [detailRes, pumpsRes, servicesRes, paymentRes] = await Promise.all([
    Api.getStation(stationId),
    Api.getStationPumps(stationId),
    Api.getStationServices(stationId),
    Api.getStationPaymentMethods(stationId),
  ]);

  const detail = extractApiData<any>(detailRes) ?? {};
  const pumps = extractApiData<any[]>(pumpsRes) ?? detail?.pumps ?? [];
  const services = extractApiData<any[]>(servicesRes) ?? detail?.services ?? [];
  const paymentMethods =
    extractApiData<any[]>(paymentRes) ?? detail?.payment_methods ?? [];
  const metadata = detail?.metadata ?? [];

  const fuels = await fetchFuelsWithPrices(stationId, pumps, services);

  const brandName =
    typeof detail?.brand === 'object' && detail?.brand !== null
      ? detail.brand.name
      : detail?.brand;

  const cardData: MapStationPin = {
    ...detail,
    id: detail?.id ?? stationId,
    name: detail?.name ?? brandName ?? 'АЗС',
    brand: brandName,
    address: detail?.address ?? '',
    latitude: Number(detail?.coordinate?.latitude),
    longitude: Number(detail?.coordinate?.longitude),
    is_available: detail?.is_available,
    fuels,
    schedule: buildScheduleFromMetadata(metadata),
    description: buildDescriptionFromMetadata(metadata),
    services: services.map(s => s?.name).filter(Boolean),
    serviceItems: services,
    pumps,
    payment_methods: paymentMethods,
    metadata,
    loading: false,
  };

  console.log('[Station] detail success', {
    stationId,
    name: cardData.name,
    pumps: pumps.length,
    services: services.length,
    fuels: fuels.length,
    paymentMethods: paymentMethods.length,
  });

  return cardData;
};

export const parseStationsListResponse = (response: any): any[] => {
  const list = extractApiData<any[]>(response);
  if (Array.isArray(list)) return list;
  const body = response?.data;
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.stations)) return body.stations;
  if (Array.isArray(body)) return body;
  return [];
};
