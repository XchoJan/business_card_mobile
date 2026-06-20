import React, { useRef } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import RightArrow from '../../../assets/icons/RightArrow';

import { useNavigation } from '@react-navigation/core';
import { walletData } from '../../../theme/walletData';

const WalletMainScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD';
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => {
    const isNegative = item.amount.startsWith('-');
    let textColor = item.color;

    if (isNegative && theme === 'dark') {
      textColor = '#FFFFFF';
    }

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ReplenishmentDetailsScreen', { item: item });
        }}
        style={styles.item}
      >
        <View style={styles.left}>
          {item.icon}
          <View>
            <Text style={[fonts.b1, { marginBottom: 2 }]}>{item.name}</Text>
            <Text style={[fonts.b2, { color: '#777' }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={[fonts.b1, { color: textColor }]}>{item.amount} ֏</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[fonts.H3, { marginBottom: 24 }]}>Кошелек</Text>
      <Text style={fonts.b2}>Баланс</Text>

      <View style={styles.balans}>
        <Text style={[fonts.H1, { bottom: -4 }]}>0 ֏</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.plus}
        onPress={() => navigation.navigate('ReplenishScreen')}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: theme === 'light' ? '#fff' : '#161616' },
        ]}
      >
        <View>
          <View style={styles.headerRow}>
            <Text style={fonts.H3}>Последние операции</Text>

            <TouchableOpacity
              style={[styles.row, { top: 2 }]}
              onPress={() => navigation.navigate('OperationsScreen')}
            >
              <Text style={[fonts.b2]}>Все</Text>
              <RightArrow fill={iconFill} />
            </TouchableOpacity>
          </View>
        </View>

        {/*<FlatList*/}
        {/*  data={walletData}*/}
        {/*  keyExtractor={item => item.id.toString()}*/}
        {/*  renderItem={renderItem}*/}
        {/*  ItemSeparatorComponent={() => <View style={styles.separator} />}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*/>*/}

        <Text style={{fontSize: 24, textAlign: 'center', top: '35%'}}>
          У вас пока нет операций
        </Text>
      </View>
    </View>
  );
};

export default WalletMainScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? 34 : 48,
      backgroundColor: getColor('bg', 'bg'),
      flex: 1,
    },
    label: {},
    balans: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 20,
    },
    plus: {
      width: 56,
      height: 56,
      borderRadius: 100,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: getColor('grey2', 'grey2'),
      marginTop: 12,
    },
    plusText: {
      fontSize: 20,
    },
    bottomContainer: {
      flex: 1,
      width: '100%',
      marginTop: 24,
      paddingHorizontal: 16,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },

    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
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
    separator: {
      height: 1,
      backgroundColor: '#EDEDED',
    },
  });
