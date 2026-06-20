import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import BackIcon from '../../../assets/icons/BackIcon';
import Api from '../../../Api';
import { deleteDriver, Driver } from '../../../store/features/technics/technicsSlice.ts';

const DriverDetailScreen = ({ route }: any) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const driver: Driver | undefined = route?.params?.driver;
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';

  const [isDeleting, setIsDeleting] = useState(false);

  const driverId = useMemo(() => {
    const raw = driver?.id ?? (driver as any)?.driver_id ?? (driver as any)?.uuid;
    return String(raw ?? '');
  }, [driver]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await Api.deleteDriver(driverId);
      dispatch(deleteDriver(driverId));
      navigation.goBack();
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon fill={iconFill} />
        </Pressable>
        <Text style={fonts.H3}>Водитель</Text>
        <View style={{ width: 20, height: 20 }} />
      </View>

      <View style={styles.card}>
        <Text style={fonts.H3}>
          {driver?.first_name} {driver?.last_name}
        </Text>
        {!!driver?.email && (
          <Text style={[fonts.b2, { color: '#777', marginTop: 6 }]}>
            Email: {driver.email}
          </Text>
        )}
        {driver?.client_vehicle_id !== undefined && (
          <Text style={[fonts.b2, { color: '#777', marginTop: 6 }]}>
            Транспорт: {driver.client_vehicle_id ?? 'не назначен'}
          </Text>
        )}
      </View>

      <Pressable
        onPress={handleDelete}
        disabled={isDeleting || !driverId}
        style={[styles.deleteBtn, (isDeleting || !driverId) && styles.deleteBtnDisabled]}
      >
        <Text style={styles.deleteBtnText}>
          {isDeleting ? 'Удаление...' : 'Удалить водителя'}
        </Text>
      </Pressable>
    </View>
  );
};

export default DriverDetailScreen;

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

