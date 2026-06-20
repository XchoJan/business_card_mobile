// MapContainer.tsx
import React, { useRef, useState } from 'react';
import ClusteredMapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { blackWhiteMap } from '../theme/blackWhiteMap';
import type { MapStationPin } from '../helpers/stations';

const MARKER_COLOR = '#4A7CB8';

const MapContainer = ({
  stations = [],
  onMarkerPress,
  onRegionChangeComplete,
}: {
  stations?: MapStationPin[];
  onMarkerPress: (station: MapStationPin) => void;
  onRegionChangeComplete?: (region: Region) => void;
}) => {
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const mapRef = useRef<any>(null);
  const regionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initialRegion = {
    latitude: 55.75,
    longitude: 37.62,
    latitudeDelta: 8,
    longitudeDelta: 8,
  };

  const handleRegionChangeComplete = (region: Region) => {
    if (!onRegionChangeComplete) return;

    if (regionTimer.current) {
      clearTimeout(regionTimer.current);
    }

    regionTimer.current = setTimeout(() => {
      onRegionChangeComplete(region);
    }, 500);
  };

  return (
    <ClusteredMapView
      ref={mapRef}
      customMapStyle={blackWhiteMap}
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={initialRegion}
      clusterColor={MARKER_COLOR}
      clusterTextColor="#FFFFFF"
      radius={56}
      minPoints={2}
      animationEnabled
      tracksViewChanges={false}
      onRegionChangeComplete={handleRegionChangeComplete}
    >
      {stations.map(station => {
        const isSelected = selectedId === station.id;

        return (
          <Marker
            key={String(station.id)}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            tracksViewChanges={false}
            onPress={() => {
              setSelectedId(station.id);
              onMarkerPress(station);
            }}
          >
            {isSelected ? (
              <View style={styles.container}>
                <View style={styles.dot} />
                <Text style={{ fontWeight: '500', color: '#000' }}>
                  {station.name}
                </Text>
              </View>
            ) : (
              <View style={styles.xz} />
            )}
          </Marker>
        );
      })}
    </ClusteredMapView>
  );
};

export default MapContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: MARKER_COLOR,
    marginRight: 6,
  },
  xz: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: MARKER_COLOR,
  },
});
