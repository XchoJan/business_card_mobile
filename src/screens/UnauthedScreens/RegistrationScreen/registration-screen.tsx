import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AuthContainer from '../../../components/AuthContainer';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import PhoneMaskInput from '../../../components/PhoneMaskInput.tsx';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import PaddingContainer from '../../../components/PaddingContainer.tsx';
import { useNavigation } from '@react-navigation/core';
import Api from '../../../Api';
import { API_URL } from '../../../Api/config';
import { appConfig, deviceName } from '../../../core/constants/app-config';
import { fetchText } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { setEmailToReducer } from '../../../store/features/registration/emailReducer.ts';

const RegistrationScreen = () => {
  const dispatch = useDispatch()
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const [activeSelect, setActiveSelect] = useState(1);
  const [email, setEmail] = useState('');
  const [deviceId, setDeviceId] = useState('');
  useEffect(() => {
    appConfig.deviceId
      .then(id => {
        if (id) {
          setDeviceId(id);
        }
      })
      .catch(error => {
        console.log('Failed to get deviceId', error);
      });
  }, []);

  const handleSendEmailOpt = async () => {
    const data = {
      device_id: deviceId,
      target: email,
    };

    try {
      const response = await Api.registrationByEmail(data);
      console.log(response.data, 'response');
      dispatch(setEmailToReducer(email))
      navigation.navigate('PinCodeScreen', { value: email, type: 'email' });

    } catch (e: any) {
      console.log(e?.response?.data, 'error from reg');
    }
  };

  return (
    <AuthContainer
      showBack
      title={'Регистрация'}
      description={'Выберите удобный для вас способ\n' + 'и введите данные'}
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
              <PhoneMaskInput />
              <View style={{ marginBottom: 12 }} />
            </View>
          ) : (
            <View>
              <AppInput
                placeholder={'Почта'}
                value={email}
                onChangeText={setEmail}
              />
              <View style={{ marginBottom: 12 }} />
            </View>
          )}
          <AppBtn
            onPress={activeSelect === 1 ? null : handleSendEmailOpt}
            text={'Получить код'}
          />
        </PaddingContainer>
      </ScrollView>
    </AuthContainer>
  );
};

export default RegistrationScreen;

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
