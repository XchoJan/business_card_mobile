import React, { useState } from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { ScrollView, StyleSheet, View } from 'react-native';
import AuthContainer from '../../../components/AuthContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import BackIcon from '../../../assets/icons/BackIcon';
import PassHideIcon from '../../../assets/icons/PassHideIcon';
import PassShowIcon from '../../../assets/icons/PassShowIcon';
import { useNavigation } from '@react-navigation/core';

const CreatePassScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD'
  const navigation = useNavigation<any>();

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCheckPass = ()=> {
    if (password !== confirmPassword) {
      console.log(11111);
    }else{
      console.log(222222);
      navigation.navigate('CompanyDataScreen', {password: password})
    }
  }

  return (
    <AuthContainer showBack title={'Придумайте пароль'}>
      <ScrollView>
        <View style={styles.btnsContainer}>
          <AppInput
            placeholder={'Пароль'}
            icon={!showPass1 ? <PassHideIcon fill={iconFill}/> : <PassShowIcon fill={iconFill}/>}
            passInput={!showPass1}
            onPressIcon={()=> setShowPass1(!showPass1)}
            value={password}
            onChangeText={setPassword}

          />
          <AppInput
            placeholder={'Повторить пароль'}
            icon={!showPass2 ? <PassHideIcon fill={iconFill}/> : <PassShowIcon fill={iconFill}/>}
            passInput={!showPass2}
            onPressIcon={()=> setShowPass2(!showPass2)}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <AppBtn
            onPress={handleCheckPass}
            text={'Сохранить'}
          />
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

export default CreatePassScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    btnsContainer: {
      paddingTop: 28,
      width: '100%',
      position: 'relative',
      marginBottom: 32,
      gap: 12,
      paddingHorizontal: 16,
    },
  });
