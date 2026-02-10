// MapContainer.tsx
import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { gasStations } from '../theme/variables';
import { blackWhiteMap } from '../theme/blackWhiteMap';
import { useDispatch } from 'react-redux';
import { setSelectedRefueling } from '../store/features/selectedRefueling/selectedRefueling.ts';

const MapContainer = ({
  onMarkerPress,
}: {
  onMarkerPress: () => void;
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const dispatch = useDispatch();
  return (
    <MapView
      customMapStyle={blackWhiteMap}
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 40.1772,
        longitude: 44.5035,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {gasStations?.map(station => {
        const isSelected = selectedId === station.id;

        return (
          <Marker
            key={station?.id}
            coordinate={{
              latitude: station?.latitude,
              longitude: station?.longitude,
            }}
            onPress={() => {
              setSelectedId(station.id);
              dispatch(setSelectedRefueling(station));
              onMarkerPress();
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
    </MapView>
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
    backgroundColor: '#4A7CB8',
    marginRight: 6,
  },
  xz: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A7CB8',
  },
});
