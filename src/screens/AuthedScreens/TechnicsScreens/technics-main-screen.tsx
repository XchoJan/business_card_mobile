import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { Technic, Driver } from '../../../store/features/technics/technicsSlice.ts';

const TechnicsMainScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'technics' | 'drivers'>('technics');

  const technics = useSelector((state: RootState) => state.technics?.technics || []);
  const drivers = useSelector((state: RootState) => state.technics?.drivers || []);

  const handleAddPress = () => {
    if (activeTab === 'technics') {
      navigation.navigate('CreateTechnicScreen');
    } else {
      navigation.navigate('CreateDriverScreen');
    }
  };

  const renderTechnicItem = ({ item }: { item: Technic }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={[fonts.b1, { marginBottom: 4 }]}>Номер: {item.carNumber}</Text>
        {item.model && <Text style={[fonts.b2, { color: '#777' }]}>Модель: {item.model}</Text>}
        {item.brand && <Text style={[fonts.b2, { color: '#777' }]}>Марка: {item.brand}</Text>}
      </View>
    </View>
  );

  const renderDriverItem = ({ item }: { item: Driver }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={[fonts.b1, { marginBottom: 4 }]}>Телефон: {item.phoneNumber}</Text>
        {item.name && <Text style={[fonts.b2, { color: '#777' }]}>Имя: {item.name}</Text>}
      </View>
    </View>
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

