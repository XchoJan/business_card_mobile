import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import RefuelContainer from './refuel-container.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/BottomSheetWrapper.tsx';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { blackWhiteMap } from '../../../theme/blackWhiteMap';

const SelectFuelScreen = ({route}: any) => {
  const { styles, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const selectedItem = useSelector((store: RootState) => store?.selectedRefueling?.refueling)
  const [selectedType, setSelectedType] = useState(null)

  const handleSelect = (el: any) => {
    setSelectedType(el);
  };


  return (
    <RefuelContainer
      disabled={!selectedType}
      title={'Колонка 2'}
      onPress={()=> navigation.navigate('SelectLiterScreen')}
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
                latitude: selectedItem.latitude,
                longitude: selectedItem.longitude,
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

        <Text style={[fonts.H2, { marginTop: 24 }]}>Выберите топливо</Text>


        <View style={{ gap: 12, marginTop: 16 }}>
          {selectedItem?.fuels?.map((el, index) => {
            const isActive = selectedType?.type === el.type;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(el)}
                activeOpacity={0.8}
                style={[
                  styles.elem,
                  isActive && styles.elemActive,
                ]}
              >
                <Text
                  style={[
                    fonts.b2,
                    isActive && styles.textActive,
                  ]}
                >
                  {el.type}
                </Text>
                <Text
                  style={[
                    fonts.b2,
                    isActive && styles.textActive,
                  ]}
                >
                  {el.price} ֏
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </RefuelContainer>
  );
};

export default SelectFuelScreen;


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
      paddingTop: 16
    },
    mapBox:{
      width: '100%',
      height: 180,
      borderRadius: 16,
      marginTop: 24
    },
    elem:{
      backgroundColor: getColor('bg', 'bg'),
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12
    },
    elemActive: {
      backgroundColor: '#39658E',
    },
    textActive: {
      color: '#fff',
    },
    addressTitle:{

    }
  });

