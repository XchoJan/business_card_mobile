import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import AuthContainer from '../../../components/AuthContainer.tsx';
import PaddingContainer from '../../../components/PaddingContainer.tsx';
import PhoneMaskInput from '../../../components/PhoneMaskInput.tsx';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import { useNavigation } from '@react-navigation/core';

const ResetPassScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const [activeSelect, setActiveSelect] = useState(1);
  const navigation = useNavigation<any>()

  return (
    <AuthContainer
      showBack
      title={'Восстановление пароля'}
      description={
        'Выберите способ, который использовали \n при регистрации, и мы пришлем код'
      }
    >
      <ScrollView>
        <View style={styles.btnsContainer}>
          <TouchableOpacity onPress={() => setActiveSelect(1)}>
            <Text style={[fonts.button, { textAlign: 'center' }]}>Телефон</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.phoneSelect,
              activeSelect === 1 && styles.activeSelect,
            ]}
          />
          <View
            style={[
              styles.emailSelect,
              activeSelect === 2 && styles.activeSelect,
            ]}
          />
          <TouchableOpacity onPress={() => setActiveSelect(2)}>
            <Text style={[fonts.button, { textAlign: 'center' }]}>Почта</Text>
          </TouchableOpacity>
        </View>

        <PaddingContainer>
          {activeSelect == 1 ? (
            <View>
              <PhoneMaskInput/>
              <View style={{ marginBottom: 12 }} />
            </View>
          ) : (
            <View>
              <AppInput placeholder={'Почта'} />
              <View style={{ marginBottom: 12 }} />
            </View>
          )}
          <AppBtn
            onPress={()=>{navigation.navigate('PinCodeScreen')}}
            text={'Получить код'}
          />
        </PaddingContainer>
      </ScrollView>
    </AuthContainer>
  );
};

export default ResetPassScreen;


const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    btnsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 28,
      width: '100%',
      position: 'relative',
      marginBottom: 32,
    },
    btnText: {},
    text: {
      color: getColor('black', 'white'),
      fontSize: 20,
    },
    activeSelect: {
      backgroundColor: getColor('blue', 'blue'),
    },
    phoneSelect: {
      width: '50%',
      position: 'absolute',
      bottom: -15,
      height: 2,
      left: 0,
      backgroundColor: '#F1F3F4',
    },
    emailSelect: {
      width: '50%',
      position: 'absolute',
      bottom: -15,
      height: 2,
      right: 0,
      backgroundColor: '#F1F3F4',
    },

    resetPassBtn: {
      alignSelf: 'flex-end',
      marginTop: 22,
      marginBottom: 24,
    },
    privacy: {
      color: getColor('black', 'white'),
      textAlign: 'center',
    },
  });
