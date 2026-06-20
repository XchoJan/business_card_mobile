import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { Driver, setDrivers, setTechnics, Technic } from '../../../store/features/technics/technicsSlice.ts';
import Api from '../../../Api';

const TechnicsMainScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'technics' | 'drivers'>('technics');

  const technics = useSelector((state: RootState) => state.technics?.technics || []);
  const drivers = useSelector((state: RootState) => state.technics?.drivers || []);

  const loadVehicles = useCallback(async () => {
    try {
      const response = await Api.getVehicles();
      const list = response?.data?.data ?? response?.data ?? [];
      const vehicles = Array.isArray(list) ? list : list?.vehicles ?? [];

      const mapped: Technic[] = (vehicles || []).map((v: any) => ({
        id: String(v?.id ?? v?.vehicle_id ?? v?.uuid ?? v?.vehicle_vin_unique_number ?? Date.now()),
        vehicle_model: v?.vehicle_model,
        vehicle_fuel_capacity: v?.vehicle_fuel_capacity,
        vehicle_vin_unique_number: v?.vehicle_vin_unique_number,
        ...v,
      }));

      dispatch(setTechnics(mapped));
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    }
  }, [dispatch]);

  const loadDrivers = useCallback(async () => {
    try {
      const response = await Api.getDrivers();
      const list = response?.data?.data ?? response?.data ?? [];
      const driversList = Array.isArray(list) ? list : list?.drivers ?? [];

      const mapped: Driver[] = (driversList || []).map((d: any) => ({
        id: String(d?.id ?? d?.driver_id ?? d?.uuid ?? d?.email ?? Date.now()),
        first_name: d?.first_name ?? '',
        last_name: d?.last_name ?? '',
        email: d?.email ?? '',
        password: d?.password ?? '',
        client_vehicle_id: d?.client_vehicle_id ?? null,
        ...d,
      }));

      dispatch(setDrivers(mapped));
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      loadVehicles().then();
      loadDrivers().then();
    }, [loadVehicles]),
  );

  // при переключении вкладки — догружаем актуальные данные
  useEffect(() => {
    if (activeTab === 'technics') {
      loadVehicles().then();
    } else {
      loadDrivers().then();
    }
  }, [activeTab, loadDrivers, loadVehicles]);

  const handleAddPress = () => {
    if (activeTab === 'technics') {
      navigation.navigate('CreateTechnicScreen');
    } else {
      navigation.navigate('CreateDriverScreen');
    }
  };

  const renderTechnicItem = ({ item }: { item: Technic }) => (
    <Pressable
      onPress={() => navigation.navigate('VehicleDetailScreen', { vehicle: item })}
      style={styles.item}
    >
      <View style={styles.itemContent}>
        {item.vehicle_model && (
          <Text style={[fonts.b1, { marginBottom: 4 }]}>
            Модель: {item.vehicle_model}
          </Text>
        )}
        {item.vehicle_fuel_capacity !== undefined && item.vehicle_fuel_capacity !== null && (
          <Text style={[fonts.b2, { color: '#777' }]}>
            Объем бака: {item.vehicle_fuel_capacity}
          </Text>
        )}
        {item.vehicle_vin_unique_number && (
          <Text style={[fonts.b2, { color: '#777' }]}>
            VIN: {item.vehicle_vin_unique_number}
          </Text>
        )}
      </View>
    </Pressable>
  );

  const renderDriverItem = ({ item }: { item: Driver }) => (
    <Pressable
      onPress={() => navigation.navigate('DriverDetailScreen', { driver: item })}
      style={styles.item}
    >
      <View style={styles.itemContent}>
        <Text style={[fonts.b1, { marginBottom: 4 }]}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={[fonts.b2, { color: '#777' }]}>Email: {item.email}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={fonts.H3}>Техники</Text>
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'technics' && styles.activeTab]}
          onPress={() => setActiveTab('technics')}
        >
          <Text
            style={[
              fonts.button,
              activeTab === 'technics' ? styles.activeTabText : styles.tabText,
            ]}
          >
            Техники
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'drivers' && styles.activeTab]}
          onPress={() => setActiveTab('drivers')}
        >
          <Text
            style={[
              fonts.button,
              activeTab === 'drivers' ? styles.activeTabText : styles.tabText,
            ]}
          >
            Водители
          </Text>
        </Pressable>
      </View>

      <View style={[styles.content, { backgroundColor: theme === 'light' ? '#fff' : '#161616' }]}>
        {activeTab === 'technics' ? (
          <FlatList
            data={technics}
            keyExtractor={item => item.id}
            renderItem={renderTechnicItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[fonts.b2, { color: '#777', textAlign: 'center' }]}>
                  Нет техник. Нажмите + чтобы добавить
                </Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={drivers}
            keyExtractor={item => item.id}
            renderItem={renderDriverItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[fonts.b2, { color: '#777', textAlign: 'center' }]}>
                  Нет водителей. Нажмите + чтобы добавить
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default TechnicsMainScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('bg', 'bg'),
      paddingTop: Platform.OS === 'android' ? 34 : 48,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 32,
      marginBottom: 24,
    },
    addButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#3E6383',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: '500',
      paddingBottom: 2
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 16,
      gap: 12,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 50,
      backgroundColor: getColor('white', 'black'),
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: '#3E6383',
    },
    tabText: {
      color: getColor('black', 'white'),
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    item: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: getColor('secondaryLightGrey', 'secondaryDarkGrey'),
      borderRadius: 12,
      marginBottom: 12,
    },
    itemContent: {
      flex: 1,
    },
    separator: {
      height: 1,
      backgroundColor: '#EDEDED',
    },
    emptyContainer: {
      paddingTop: 40,
    },
  });

