import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RefuelContainer from './refuel-container.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/BottomSheetWrapper.tsx';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { blackWhiteMap } from '../../../theme/blackWhiteMap';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';

const RefuelScreen = () => {
  const { styles, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const selectedItem = useSelector(
    (store: RootState) => store?.selectedRefueling?.refueling,
  );

  const pumps = selectedItem?.pumps?.length
    ? selectedItem.pumps.filter((p: any) => p?.active !== false)
    : [];
  const [selectedPump, setSelectedPump] = useState<number | string | null>(null);

  const mapRegion = selectedItem?.latitude && selectedItem?.longitude
    ? {
        latitude: Number(selectedItem.latitude),
        longitude: Number(selectedItem.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 55.75,
        longitude: 37.62,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

  return (
    <RefuelContainer
      onPress={() => navigation.navigate('SelectFuelScreen')}
      disabled={!selectedPump}
      title={'Заправиться'}
    >
      <View style={styles.container}>
        <Text style={fonts.H5}>{selectedItem?.address}</Text>

        <View style={styles.mapBox}>
          <MapView
            customMapStyle={blackWhiteMap}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={mapRegion}
          >
            <Marker
              key={String(selectedItem?.id ?? 'station')}
              coordinate={{
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude,
              }}
              style={{ overflow: 'hidden' }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#4A7CB8',
                }}
              />
            </Marker>
          </MapView>
        </View>

        <View>
          <Text style={[fonts.H2, { marginVertical: 24 }]}>
            Выберите колонку
          </Text>

          <View style={styles.grid}>
            {pumps.length ? (
              pumps.map((pump: any) => {
                const pumpKey = pump.id ?? pump.uuid;
                const isActive = selectedPump === pumpKey;
                return (
                  <TouchableOpacity
                    key={String(pumpKey)}
                    onPress={() => setSelectedPump(pumpKey)}
                    activeOpacity={0.8}
                    style={[styles.cell, isActive && styles.activeCell]}
                  >
                    <Text
                      style={[styles.cellText, isActive && styles.activeCellText]}
                    >
                      {pump.name ?? pumpKey}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={[fonts.b2, { color: '#777' }]}>
                Колонки для этой АЗС не найдены
              </Text>
            )}
          </View>
        </View>
      </View>
    </RefuelContainer>
  );
};

export default RefuelScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('white', 'black'),
      width: '100%',
      height: '100%',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    mapBox: {
      width: '100%',
      height: 180,
      borderRadius: 16,
      marginTop: 24,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      width: '100%',
      gap: 8,
    },
    cell: {
      width: 80,
      height: 80,
      backgroundColor: '#EAEBF1',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    activeCell: {
      backgroundColor: '#39658E',
    },
    cellText: {
      fontSize: 18,
      color: '#000',
    },
    activeCellText: {
      color: '#fff',
    },
  });
