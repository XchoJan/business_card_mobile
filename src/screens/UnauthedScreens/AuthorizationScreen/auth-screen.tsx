import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView, Pressable,
} from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import AuthContainer from '../../../components/AuthContainer.tsx';

import PaddingContainer from '../../../components/PaddingContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import { useNavigation } from '@react-navigation/core';
import PhoneMaskInput from '../../../components/PhoneMaskInput.tsx';
import PassHideIcon from '../../../assets/icons/PassHideIcon';
import PassShowIcon from '../../../assets/icons/PassShowIcon';
import PrivacyPolicy from '../../../components/PrivacyPolicy.tsx';
import { setToken } from '../../../store/features/token/tokenSlice.ts';
import { useDispatch } from 'react-redux';

const AuthScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD'
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const [activeSelect, setActiveSelect] = useState(1);
  const [visible,setVisible] = useState(false);


  const [showPass, setShowPass] = useState(false);
  return (
    <AuthContainer
      title={'Авторизация'}
      description={
        'Выберите способ, который использовали при регистрации и введите данные'
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

              <AppInput
                icon={!showPass ? <PassHideIcon fill={iconFill}/> : <PassShowIcon fill={iconFill}/>}
                placeholder={'Пароль'}
                passInput={!showPass}
                onPressIcon={()=> setShowPass(!showPass)}
              />
            </View>
          ) : (
            <View>
              <AppInput
                placeholder={'Почта'}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Пароль'}
                icon={!showPass ? <PassHideIcon fill={iconFill}/> : <PassShowIcon fill={iconFill}/>}
                passInput={!showPass}
                onPressIcon={()=> setShowPass(!showPass)}
              />
            </View>
          )}

          <Pressable onPress={()=> navigation.navigate('ResetPassScreen')} style={styles.resetPassBtn}>
            <Text style={fonts.b1}>Забыли пароль?</Text>
          </Pressable>

          <AppBtn onPress={()=> dispatch(setToken('KJASHDKAJSD'))} text={'Войти'} />

          <View>
            <Text style={[fonts.b3, { textAlign: 'center', marginTop: 24 }]}>
              Нажимая на кнопку “Войти” вы принимаете условия
            </Text>

            <Pressable onPress={()=> setVisible(true)}>
              <Text style={[fonts.b3, styles.privacy]}>
                Политики конфиденциальности
              </Text>
            </Pressable>
          </View>
        </PaddingContainer>
        <View style={styles.noAcc}>
          <Text style={fonts.b3}>
            Нет аккаунта?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
            <Text style={[fonts.b3, styles.privacy, {marginLeft: 4}]}>
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PrivacyPolicy
        visible={visible}
        setShowVisible={()=> setVisible(false)}
      />
    </AuthContainer>
  );
};

export default AuthScreen;

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
    noAcc:{
      marginTop: 22,
      alignSelf: 'center',
      flexDirection: 'row'
    }
  });
