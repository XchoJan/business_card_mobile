import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import BackIcon from '../../../assets/icons/BackIcon';
import Api from '../../../Api';
import { RootState } from '../../../store/store.ts';
import {
  deleteTechnic,
  Driver,
  setDrivers,
} from '../../../store/features/technics/technicsSlice.ts';

const VehicleDetailScreen = ({ route }: any) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const vehicle = route?.params?.vehicle;
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';

  const [attachingDriverId, setAttachingDriverId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const drivers = useSelector((state: RootState) => state.technics?.drivers || []);

  const vehicleId = useMemo(() => {
    const raw = vehicle?.id ?? vehicle?.vehicle_id ?? vehicle?.uuid;
    const num = typeof raw === 'string' ? Number(raw) : raw;
    return Number.isFinite(num) ? Number(num) : raw;
  }, [vehicle]);

  const handleAttach = async (driver: Driver) => {
    try {
      setAttachingDriverId(driver.id);
      await Api.attachDriver(driver.id, vehicleId);

      // локально обновим redux, чтобы сразу отразилось в UI
      const nextDrivers = drivers.map(d =>
        d.id === driver.id ? { ...d, client_vehicle_id: vehicleId } : d,
      );
      dispatch(setDrivers(nextDrivers));
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    } finally {
      setAttachingDriverId(null);
    }
  };

  const handleDeleteVehicle = async () => {
    try {
      setIsDeleting(true);
      await Api.deleteVehicle(vehicleId);
      dispatch(deleteTechnic(String(vehicle?.id ?? vehicleId)));
      navigation.goBack();
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderDriver = ({ item }: { item: Driver }) => {
    const isAssigned =
      item?.client_vehicle_id !== null &&
      String(item?.client_vehicle_id) === String(vehicleId);
    const isLoading = attachingDriverId === item.id;

    return (
      <View style={styles.driverRow}>
        <View style={{ flex: 1 }}>
          <Text style={fonts.b1}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={[fonts.b2, { color: '#777' }]}>{item.email}</Text>
        </View>

        <Pressable
          onPress={() => handleAttach(item)}
          disabled={isLoading || isAssigned}
          style={[
            styles.attachBtn,
            (isLoading || isAssigned) && styles.attachBtnDisabled,
          ]}
        >
          <Text style={styles.attachBtnText}>
            {isAssigned ? 'Назначен' : isLoading ? '...' : 'Назначить водителем'}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon fill={iconFill} />
        </Pressable>
        <Text style={fonts.H3}>Транспорт</Text>
        <View style={{ width: 20, height: 20 }} />
      </View>

      <View style={styles.card}>
        {!!vehicle?.vehicle_model && (
          <Text style={fonts.H3}>{vehicle.vehicle_model}</Text>
        )}
        {vehicle?.vehicle_fuel_capacity !== undefined &&
          vehicle?.vehicle_fuel_capacity !== null && (
            <Text style={[fonts.b2, { color: '#777', marginTop: 6 }]}>
              Объем бака: {vehicle.vehicle_fuel_capacity}
            </Text>
          )}
        {!!vehicle?.vehicle_vin_unique_number && (
          <Text style={[fonts.b2, { color: '#777', marginTop: 6 }]}>
            VIN: {vehicle.vehicle_vin_unique_number}
          </Text>
        )}
      </View>

      <Pressable
        onPress={handleDeleteVehicle}
        disabled={isDeleting}
        style={[styles.deleteBtn, isDeleting && styles.deleteBtnDisabled]}
      >
        <Text style={styles.deleteBtnText}>
          {isDeleting ? 'Удаление...' : 'Удалить технику'}
        </Text>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={fonts.H3}>Водители</Text>
      </View>

      <FlatList
        data={drivers}
        keyExtractor={item => item.id}
        renderItem={renderDriver}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <View style={{ paddingTop: 24 }}>
            <Text style={[fonts.b2, { color: '#777', textAlign: 'center' }]}>
              Нет водителей
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default VehicleDetailScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('bg', 'bg'),
      paddingTop: Platform.OS === 'android' ? 34 : 48,
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 16,
    },
    card: {
      backgroundColor: getColor('secondaryLightGrey', 'secondaryDarkGrey'),
      borderRadius: 12,
      padding: 16,
    },
    sectionHeader: {
      marginTop: 18,
      marginBottom: 10,
    },
    driverRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: getColor('secondaryLightGrey', 'secondaryDarkGrey'),
      borderRadius: 12,
      marginBottom: 12,
    },
    attachBtn: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: '#3E6383',
    },
    attachBtnDisabled: {
      opacity: 0.6,
    },
    attachBtnText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    deleteBtn: {
      marginTop: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: '#D64545',
      alignItems: 'center',
    },
    deleteBtnDisabled: {
      opacity: 0.7,
    },
    deleteBtnText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
  });

