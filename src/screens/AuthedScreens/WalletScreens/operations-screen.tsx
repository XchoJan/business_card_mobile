import React, { useState } from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import HideTabBar from '../../../components/HideTabBar.tsx';
import RefuelContainer from '../MainScreens/refuel-container.tsx';
import BackIcon from '../../../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/core';
import DownIcon from '../../../assets/icons/DownIcon';
import MinDramIcon from '../../../assets/icons/MinDramIcon';
import { walletData } from '../../../theme/walletData';
import { getColors } from '../../../theme/colors.ts';
import PeriodCalendar from '../../../components/PeriodCalendar.tsx';

const OperationsScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const navigation = useNavigation<any>();

  const [selectedMonth, setSelectedMonth] = useState('Сентябрь');
  const [selectedStatus, setSelectedStatus] = useState<
    'Успешно' | 'Прервано' | 'Отменено' | null
  >(null);

  const statuses = ['Успешно', 'Прервано', 'Отменено'];

  const [selectedType, setSelectedType] = useState<
    'Заправка' | 'Пополнение' | null
  >('Заправка');

  const types = [
    { title: 'Заправка', value: '0 ֏' },
    { title: 'Пополнение', value: '0 ֏' },
  ];

  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handlePeriodSelect = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    if (startDate && endDate) {
      const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ];
      const startMonth = monthNames[startDate.getMonth()];
      const endMonth = monthNames[endDate.getMonth()];

      if (startMonth === endMonth) {
        setSelectedMonth(startMonth);
      } else {
        setSelectedMonth(`${startMonth} - ${endMonth}`);
      }
    }
  };

  const renderItem = ({ item }: any) => {
    // логика цвета для суммы
    const isNegative = item.amount.startsWith('-');
    let textColor = item.color;

    if (isNegative && theme === 'dark') {
      textColor = '#FFFFFF';
    }

    return (
      <View style={styles.item}>
        <View style={styles.left}>
          {item.icon}
          <View>
            <Text style={[fonts.b1, { marginBottom: 2 }]}>{item.name}</Text>
            <Text style={[fonts.b2, { color: '#777' }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={[fonts.b1, { color: textColor }]}>{item.amount} ֏</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackIcon fill={iconFill} />
          </Pressable>

          <Text style={fonts.H3}>Операции</Text>

          <View style={{ width: 20, height: 20 }} />
        </View>

        <View>
          <ScrollView
            style={{ marginBottom: 24 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <View style={styles.filterRow}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.monthButton}
                  onPress={() => {
                    setIsVisibleFilter(true);
                  }}
                >
                  <Text style={styles.monthText}>{selectedMonth}</Text>
                  <View style={{ marginLeft: 6 }}>
                    <DownIcon width={12} height={12} fill="#fff" />
                  </View>
                </TouchableOpacity>

                {statuses.map(status => (
                  <Pressable
                    key={status}
                    style={[
                      styles.statusButton,
                      selectedStatus === status && styles.statusButtonActive,
                    ]}
                    onPress={() =>
                      setSelectedStatus(
                        selectedStatus === status ? null : status,
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.statusText,
                        selectedStatus === status && styles.statusTextActive,
                      ]}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.typeRow}>
            {types.map(item => (
              <Pressable
                key={item.title}
                style={[
                  styles.typeCard,
                  selectedType === item.title && styles.typeCardActive,
                ]}
                onPress={() => setSelectedType(item.title)}
              >
                <Text
                  style={[
                    styles.typeTitle,
                    selectedType === item.title && styles.typeTitleActive,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.typeValue,
                    selectedType === item.title && styles.typeValueActive,
                  ]}
                >
                  {item.value}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Text style={[fonts.b2, styles.dayTitle]}>Вчера</Text>
        {/*<FlatList*/}
        {/*  data={walletData}*/}
        {/*  keyExtractor={item => item.id.toString()}*/}
        {/*  renderItem={renderItem}*/}
        {/*  ItemSeparatorComponent={() => <View style={styles.separator} />}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*/>*/}
        <Text style={{fontSize: 24, textAlign: 'center', top: '35%'}}>
          Список пока пуст
        </Text>
      </View>
      <HideTabBar />

      <Modal
        isVisible={isVisibleFilter}
        style={styles.modal}
        onBackdropPress={() => setIsVisibleFilter(false)}
        onBackButtonPress={() => setIsVisibleFilter(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable
              onPress={() => setIsVisibleFilter(false)}
            >
              <BackIcon fill={iconFill} />
            </Pressable>

            <Text style={fonts.H3}>Выберите период</Text>

            <View style={{ width: 20, height: 20 }} />
          </View>

          <PeriodCalendar
            onSelect={handlePeriodSelect}
            onClose={() => setIsVisibleFilter(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default OperationsScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    topContainer: {
      backgroundColor: getColor('bg', 'bg'),
    },
    container: {
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? 34 : 48,
      backgroundColor: getColor('bg', 'bg'),
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 55,
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    wrapper: {
      flex: 1,
      backgroundColor: getColor('white', 'black'),
      paddingHorizontal: 16,
      paddingTop: 24,
    },
    unactiveElem: {
      backgroundColor: getColor('white', 'black'),
    },
    filterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 12,
    },
    monthButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#3E6383',
      borderRadius: 50,
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    monthText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
    },
    statusButton: {
      backgroundColor: '#fff',
      borderRadius: 50,
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    statusButtonActive: {
      backgroundColor: '#3E6383',
    },
    statusText: {
      color: '#000',
      fontSize: 15,
      fontWeight: '500',
    },
    statusTextActive: {
      color: '#fff',
    },
    typeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      marginBottom: 20,
    },
    typeCard: {
      flex: 1,
      backgroundColor: getColor('white', 'black'),
      borderRadius: 20,
      paddingVertical: 14,
      paddingHorizontal: 18,
      marginHorizontal: 4,
    },
    typeCardActive: {
      backgroundColor: '#3E6383',
    },
    typeTitle: {
      color: '#777',
      fontSize: 14,
      marginBottom: 4,
      fontWeight: '400',
    },
    typeValue: {
      color: getColor('black', 'white'),
      fontSize: 16,
      fontWeight: '600',
    },
    typeTitleActive: {
      color: '#fff',
    },
    typeValueActive: {
      color: '#fff',
    },

    separator: {
      height: 1,
      backgroundColor: '#EDEDED',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    dayTitle: {
      color: getColor('grey', 'secondaryDarkGrey'),
    },
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: getColor('white', 'black'),
      height: '100%',
      paddingTop: Platform.OS === 'android' ? 34 : 48,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 24,
    },
  });
