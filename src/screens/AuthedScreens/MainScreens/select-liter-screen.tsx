import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import RefuelContainer from './refuel-container.tsx';

const SelectLiterScreen = () => {
  const { styles, fonts } = useStyles(createStyles);

  const navigation = useNavigation<any>();

  const max = 70;
  const pricePerLitre = 190;
  const [litres, setLitres] = useState(26);
  const amount = (pricePerLitre * litres).toFixed(0);
  const [active, setActive] = useState('Сумма');

  const fillAnim = useRef(new Animated.Value(litres / max)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        let delta = -gesture.dy / 5;
        let newValue = Math.max(0, Math.min(max, litres + delta));
        setLitres(newValue);

        Animated.timing(fillAnim, {
          toValue: newValue / max,
          duration: 50,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const updateLitres = (newValue: number) => {
    const clamped = Math.max(0, Math.min(max, newValue));
    setLitres(clamped);
    Animated.timing(fillAnim, {
      toValue: clamped / max,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <RefuelContainer onPress={()=> navigation.navigate('ConfirmRefuelingScreen')} title={'АИ-95'}>
      <View style={styles.container}>
        {/* Сумма / Полный бак */}
        <View style={styles.elemBox}>
          <TouchableOpacity
            style={active === 'Сумма' && styles.activeElem}
            onPress={() => setActive('Сумма')}
          >
            <Text
              style={[
                fonts.b1,
                {  paddingVertical: 8, paddingHorizontal: 16 },
              ]}
            >
              Сумма
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={active === 'Полный бак' && styles.activeElem}
            onPress={() => setActive('Полный бак')}
          >
            <Text
              style={[
                fonts.b1,
                {  paddingVertical: 8, paddingHorizontal: 16 },
              ]}
            >
              Полный бак
            </Text>
          </TouchableOpacity>
        </View>

        {/* Бак + кнопки */}
        <View style={localStyles.wrapper}>
          <View style={localStyles.valuesRow}>
            <Text style={[localStyles.amount, fonts.H4]}>{amount} ֏</Text>
            <Text style={[localStyles.litres, fonts.H4]}>{litres.toFixed(0)} л</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center',}}>
            <View style={localStyles.tankContainer} {...panResponder.panHandlers}>
              <View style={localStyles.tankBackground}>
                <Animated.View
                  style={[
                    localStyles.tankFill,
                    {
                      height: fillAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>

            <View style={{ justifyContent: 'space-between', height: 300 }}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => updateLitres(litres + 1)}
              >
                <Text style={[styles.circleBtnText, fonts.H4]}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => updateLitres(litres - 1)}
              >
                <Text style={[styles.circleBtnText, fonts.H4]}>−</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[localStyles.priceText, fonts.H4]}>Цена за литр: {pricePerLitre} ֏</Text>
          <Text style={[localStyles.hintText, fonts.b2]}>
            Тяните вверх-вниз, чтобы изменить количество
          </Text>
        </View>
      </View>
    </RefuelContainer>
  );
};

export default SelectLiterScreen;

const localStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  valuesRow: {
    width: 300,
    marginBottom: 8,
    top: 100
  },
  amount: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  litres: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  tankContainer: {
    width: 150,
    height: 300,
    borderRadius: 32,
    backgroundColor: '#EAEBF1',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 64,
    marginRight: 12
  },
  tankBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  tankFill: {
    backgroundColor: '#0C9244',
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  priceText: {
    fontSize: 16,
    marginTop: 12,
    color: '#000',
    fontWeight: '500',
  },
  hintText: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 6,
  },
});

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
    elemBox:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      backgroundColor: getColor('white', 'secondaryDarkGrey'),
      alignSelf: 'center',
      borderRadius: 100,
      padding: 4
    },
    circleBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: '#D1D1D6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleBtnText: {
      fontSize: 26,
      color: '#000',
      fontWeight: '400',
    },
    activeElem:{
      backgroundColor: getColor('white', 'black'),
      borderRadius: 100
    }
  });
