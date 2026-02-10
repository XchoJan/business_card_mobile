import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

const PistolScreen = () => {
  const { styles, fonts, theme } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  let iconFill = theme === 'light' ? '#0D0D0D' : '#CDCDCD'
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(()=> {
      navigation.navigate('SuccessComplateScreen')
    }, 5000)
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {theme === 'light' ?
          <LottieView
            style={{ width: 240, height: 140, marginBottom: 40 }}
            source={require('../../../assets/lottie/lightModeAnimation.json')}
            colorFilters={[
              {
                keypath: 'button',
                color: '#F00000',
              },
              {
                keypath: 'Sending Loader',
                color: '#F00000',
              },
            ]}
            autoPlay
            loop
          />
          :
          <LottieView
            style={{ width: 240, height: 140, marginBottom: 40 }}
            source={require('../../../assets/lottie/darkModeAnimation.json')}
            colorFilters={[
              {
                keypath: 'button',
                color: '#F00000',
              },
              {
                keypath: 'Sending Loader',
                color: '#F00000',
              },
            ]}
            autoPlay
            loop
          />

        }
        <View style={{ gap: 12, alignItems: 'center' }}>
          <Text style={fonts.H4}>Колонка 2</Text>
          <Text style={fonts.H2}>Вставьте пистолет</Text>
          <Text style={fonts.b2}>
            Убедитесь, что вы находитесь у правильной колонки
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={{ alignItems: 'center', marginBottom: 64 }}
      >
        <Text style={[fonts.button, { color: 'red' }]}>Отменить заправку</Text>
      </TouchableOpacity>

      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.topContainer}>
            <Text
              style={[fonts.H4, { textAlign: 'center', marginVertical: 24 }]}
            >
              Вы уверены, что хотите отменить заправку? Текущая сессия будет
              прервана, зарезервированные средства будут отменены
            </Text>

            <View style={[styles.line]} />
            <Pressable>
              <Text
                style={[
                  fonts.button,
                  styles.cancel,
                  { marginVertical: 16, textAlign: 'center', color: 'red' },
                ]}
              >
                Отменить заправку
              </Text>
            </Pressable>
          </View>
          <View style={styles.bottomContainer}>
            <Pressable onPress={() => setIsVisible(false)}>
              <Text style={[fonts.button, styles.cancel]}>Отменить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PistolScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    wrapper:{
      backgroundColor: getColor('white', 'black'),
      flex: 1
    },
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    checkContainer:{
      backgroundColor: getColor('white', 'black'),
      padding: 16,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#DBDBDB'
    },

    modalContainer: {
      bottom: 0,
      position: 'absolute',
      width: '100%',
    },
    topContainer: {
      width: '100%',
      height: 196,
      backgroundColor: '#fff',
      marginBottom: 16,
      borderRadius: 16,
      paddingHorizontal: 16
    },
    bottomContainer: {
      width: '100%',
      height: 56,
      backgroundColor: '#fff',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancel: {
      color: getColor('blue', 'white'),
    },
    line:{
      height: 1,
      width: '100%',
      backgroundColor: '#DBDBDB',

    }
  });
