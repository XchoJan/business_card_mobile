import React, { useEffect, useState } from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { StyleSheet, Text, View } from 'react-native';
import AuthContainer from '../../../components/AuthContainer.tsx';
import PinInputs from '../../../components/PinInputs.tsx';
import { useNavigation } from '@react-navigation/core';
import Api from '../../../Api';
import { appConfig } from '../../../core/constants/app-config';

const PinCodeScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>()
  const [value, setValue] = useState('');
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

  useEffect(() => {
    if (value.length === 6){
      handleCheckOpt().then()
    }else {

    }
  }, [value]);

  const handleCheckOpt = async () => {
    try {
      const response = await Api.emailOptCheck({code: value, device_id: deviceId})
      console.log(response.data, 'check opt response');
      navigation.navigate('CreatePassScreen')
    }catch (e: any){
      console.log(e.response);
    }
  }

  console.log(value, 'VALUE');

  return (
    <AuthContainer
      showBack
      title={'Введите код'}
      description={
       'Мы отправили смс с кодом на \n ваш номер телефона +374 77 777 777'
      }
    >
      <View style={{paddingHorizontal: 58}}>
        <PinInputs setValue={setValue} value={value} />
      </View>
    </AuthContainer>
  );
};

export default PinCodeScreen;


const createStyles = (getColor: (light: ColorsEnum, dark: ColorsEnum) => string) =>
  StyleSheet.create({

  });
