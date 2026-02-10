import React, { useEffect, useState } from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { StyleSheet, Text, View } from 'react-native';
import AuthContainer from '../../../components/AuthContainer.tsx';
import PinInputs from '../../../components/PinInputs.tsx';
import { useNavigation } from '@react-navigation/core';

const PinCodeScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>()

  const [value, setValue] = useState('');

  useEffect(() => {
    if (value.length === 4){
      navigation.navigate('CreatePassScreen')
    }else {

    }
  }, [value]);
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
