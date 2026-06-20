import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import MapContainer from '../../../components/MapContainer';
import BottomSheetWrapper from '../../../components/BottomSheetWrapper';
import Api from '../../../Api';
import { setSelectedRefueling } from '../../../store/features/selectedRefueling/selectedRefueling.ts';
import {
  fetchStationCardData,
  mapStationPinFromApi,
  MapStationPin,
  parseStationsListResponse,
  regionToStationBounds,
} from '../../../helpers/stations';

const MapMainScreen = () => {
  const dispatch = useDispatch();
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [stations, setStations] = useState<MapStationPin[]>([]);
  const [stationLoading, setStationLoading] = useState(false);
  const lastBoundsKey = useRef('');

  const loadStations = useCallback(async (region?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => {
    try {
      const params = region
        ? regionToStationBounds(region)
        : { limit: 1000 };

      const boundsKey = region
        ? `${params.south_west_lat}:${params.north_east_lat}:${params.south_west_lng}:${params.north_east_lng}`
        : 'default';

      if (boundsKey === lastBoundsKey.current) return;
      lastBoundsKey.current = boundsKey;

      console.log('[Stations] request start', params);
      const response = await Api.getStations(params);
      const mapped = parseStationsListResponse(response)
        .map(mapStationPinFromApi)
        .filter((s): s is MapStationPin => s !== null);

      setStations(mapped);

      console.log('[Stations] success', {
        status: response?.status,
        count: mapped.length,
        sample: mapped[0],
      });
    } catch (e: any) {
      console.error('[Stations] error', {
        status: e?.response?.status,
        data: e?.response?.data,
        message: e?.message,
      });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      lastBoundsKey.current = '';
      loadStations().then();
    }, [loadStations]),
  );

  const handleRegionChange = useCallback(
    (region: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    }) => {
      loadStations(region).then();
    },
    [loadStations],
  );

  const handleMarkerPress = useCallback(
    async (station: MapStationPin) => {
      setSheetIndex(0);
      dispatch(
        setSelectedRefueling({
          ...station,
          loading: true,
        }),
      );
      setStationLoading(true);

      try {
        const cardData = await fetchStationCardData(station.id);
        dispatch(setSelectedRefueling(cardData));
      } catch (e: any) {
        console.error('[Station] detail error', {
          stationId: station.id,
          status: e?.response?.status,
          data: e?.response?.data,
          message: e?.message,
        });
        dispatch(
          setSelectedRefueling({
            ...station,
            loading: false,
          }),
        );
      } finally {
        setStationLoading(false);
      }
    },
    [dispatch],
  );

  const handleSheetChange = (index: number) => {
    setSheetIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapContainer
        stations={stations}
        onMarkerPress={handleMarkerPress}
        onRegionChangeComplete={handleRegionChange}
      />

      <BottomSheetWrapper
        index={sheetIndex}
        onChange={handleSheetChange}
        loading={stationLoading}
      />
    </View>
  );
};

export default MapMainScreen;
