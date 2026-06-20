import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import selectedRefueling, {
  setSelectedRefueling,
} from '../store/features/selectedRefueling/selectedRefueling.ts';
import GasStation from '../assets/icons/GasStation';
import StateLayer from '../assets/icons/StateLayer';
import { getColors } from '../theme/colors.ts';
import { setTabBarVisible } from '../store/features/booleans/tabBarVisible.ts';
import CreateRoadModal from './CreateRoadModal.tsx';
import { useNavigation } from '@react-navigation/core';
import bottomSheet from '@gorhom/bottom-sheet/src';

interface BottomSheetWrapperProps {
  index: number;
  onChange?: (index: number) => void;
  onClose?: any;
  loading?: boolean;
}

interface Fuel {
  type: string;
  price: number | null;
  currency?: string;
}

interface SelectedItem {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  fuels: Fuel[];
  schedule: string;
  services: string[];
  description: string;
  pumps?: any[];
  payment_methods?: any[];
  loading?: boolean;
}

export interface RootState {
  selectedRefueling: {
    refueling: SelectedItem | null;
  };
}

const BottomSheetWrapper = ({
  index,
  onChange,
  onClose,
  loading = false,
}: BottomSheetWrapperProps) => {
  const { styles, fonts } = useStyles(createStyles);
  const selectedItem = useSelector(
    (store: RootState) => store?.selectedRefueling?.refueling,
  );
  const [isVisibleRoad, setIsVisibleRoad] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const handleSheetChanges = useCallback(
    (index: number) => onChange?.(index),
    [onChange],
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

   const handleClose = () => {
     bottomSheetRef.current?.close();
   }



  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={onClose}
      index={index} // ← управляем динамически
      snapPoints={['40%', '90%']}
      onChange={handleSheetChanges}
      enablePanDownToClose
      style={{ zIndex: 9999 }}
      backgroundStyle={{ backgroundColor: '#fff' }}
      handleIndicatorStyle={{ backgroundColor: '#ccc', width: 80 }}
      onAnimate={(fromIndex, toIndex) => {
        // Этот колбэк вызывается сразу при начале анимации
        if (toIndex === -1) {
          console.log('Началось закрытие');
          dispatch(setTabBarVisible(true)); // показать таббар сразу при начале закрытия
        } else {
          dispatch(setTabBarVisible(false)); // скрыть таббар при открытии
        }
      }}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4A7CB8" />
            <Text style={[fonts.b2, { marginTop: 12, color: '#777' }]}>
              Загрузка данных АЗС...
            </Text>
          </View>
        ) : (
          <>
        <View style={[styles.marginTop24]}>
          <Text style={[fonts.H1, { textAlign: 'center', color: '#000' }]}>
            {selectedItem?.name}
          </Text>
        </View>
        <View style={[styles.marginTop12]}>
          <Text style={[fonts.b2, { textAlign: 'center', color: '#000' }]}>
            {selectedItem?.address || 'Адрес не указан'}
          </Text>
        </View>

        <View style={styles.btns}>
          <View style={{ width: 90 }}>
            <Pressable
              onPress={() => {
                  navigation.navigate('RefuelScreen');
              }}
              style={styles.btn}
            >
              <GasStation />
            </Pressable>
            <Text style={[fonts.b2, { textAlign: 'center', color: '#000' }]}>
              Заправиться
            </Text>
          </View>

          <View style={{ width: 90 }}>
            <Pressable
              onPress={() => setIsVisibleRoad(true)}
              style={styles.btn}
            >
              <StateLayer />
            </Pressable>
            <Text style={[fonts.b2, { textAlign: 'center', color: '#000' }]}>
              Маршрут
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        {selectedItem?.fuels?.length ? (
          <View style={styles.container}>
            {selectedItem.fuels.map((item, fuelIndex) => (
              <View
                key={fuelIndex}
                style={[
                  styles.row,
                  fuelIndex === 0 && styles.firstRow,
                  fuelIndex === selectedItem.fuels.length - 1 && styles.lastRow,
                ]}
              >
                <Text style={[styles.type, { color: '#000' }]}>{item.type}</Text>
                <Text style={[styles.price, { color: '#000' }]}>
                  {item.price} {item.currency ?? '֏'}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[fonts.b2, { color: '#777', marginBottom: 12 }]}>
            Цены на топливо временно недоступны
          </Text>
        )}

        <View style={styles.line} />

        {!!selectedItem?.description && (
          <View style={{ width: '100%', marginBottom: 24 }}>
            <Text style={[fonts.H2, { textAlign: 'left', color: '#000' }]}>
              Дополнительно об АЗС
            </Text>

            <Text style={[fonts.b2, styles.b2Color, { color: '#777777' }]}>
              {selectedItem.description}
            </Text>
          </View>
        )}

        {!!selectedItem?.schedule && (
          <View style={{ width: '100%', marginBottom: 24 }}>
            <Text style={[fonts.H2, { textAlign: 'left', color: '#000' }]}>
              График работы
            </Text>

            <Text style={[fonts.b2, styles.b2Color, { color: '#777777' }]}>
              {selectedItem.schedule}
            </Text>
          </View>
        )}

        {!!selectedItem?.services?.length && (
          <View style={{ width: '100%', marginBottom: 24 }}>
            <Text style={[fonts.H2, { textAlign: 'left', color: '#000' }]}>
              Сервисы и услуги
            </Text>

            {selectedItem.services.map((service: string, serviceIndex: number) => (
              <View
                key={serviceIndex}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    marginRight: 6,
                    top: 8,
                  }}
                >
                  •
                </Text>
                <Text style={[fonts.b2, styles.b2Color, { color: '#777777' }]}>
                  {service}
                </Text>
              </View>
            ))}
          </View>
        )}

        {!!selectedItem?.payment_methods?.length && (
          <View style={{ width: '100%', marginBottom: 24 }}>
            <Text style={[fonts.H2, { textAlign: 'left', color: '#000' }]}>
              Способы оплаты
            </Text>

            {selectedItem.payment_methods.map((method: any, methodIndex: number) => (
              <Text
                key={methodIndex}
                style={[fonts.b2, styles.b2Color, { color: '#777777' }]}
              >
                • {method?.name ?? method?.code}
              </Text>
            ))}
          </View>
        )}
          </>
        )}
      </BottomSheetScrollView>

      <CreateRoadModal
        isVisibleRoad={isVisibleRoad}
        onPressCancel={() => setIsVisibleRoad(false)}
        onClose={() => setIsVisibleRoad(false)}
      />
    </BottomSheet>
  );
};

export default BottomSheetWrapper;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 23,
      height: '100%',
      width: '100%',
      marginBottom: Platform.OS === 'android' ? 44 : 23,
    },
    marginTop24: {
      marginTop: 24,
    },
    marginTop12: {
      marginTop: 12,
    },
    btns: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      marginTop: 24,
    },
    btn: {
      borderWidth: 1,
      borderRadius: 100,
      borderColor: '#DBDBDB',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 8,
    },
    line: {
      marginVertical: 24,
      width: '100%',
      height: 1,
      backgroundColor: '#DBDBDB',
    },
    container: {
      backgroundColor: '#EAEBF1',
      borderRadius: 12,
      overflow: 'hidden',
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
    },
    firstRow: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    lastRow: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    type: {
      fontSize: 16,
      color: '#000',
    },
    price: {
      fontSize: 16,
      color: '#000',
    },
    b2Color: {
      color: getColor('grey', 'white'),
      marginTop: 12,
    },
    loader: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 48,
      paddingBottom: 32,
    },
  });
