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

  const arr = [1, 2, 3, 4, 5, 6, 7];
  const [selectedPump, setSelectedPump] = useState<number | null>(null);

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
            initialRegion={{
              latitude: 40.1772,
              longitude: 44.5035,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              key={Math.random().toString()}
              coordinate={{
                latitude: selectedItem?.latitude,
                longitude: selectedItem?.longitude,
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
            {arr.map(item => {
              const isActive = selectedPump === item;
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedPump(item)}
                  activeOpacity={0.8}
                  style={[styles.cell, isActive && styles.activeCell]}
                >
                  <Text
                    style={[styles.cellText, isActive && styles.activeCellText]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
