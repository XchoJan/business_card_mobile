import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SuccessPayedIcon from '../../../assets/icons/SuccessPayedIcon';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import CheckIcon from '../../../assets/icons/CheckIcon';
import AppBtn from '../../../components/AppBtn.tsx';

const SuccessPayedScreen = () => {
  const { styles, fonts, theme } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  let iconFill = theme === 'light' ? '#0D0D0D' : '#CDCDCD'

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <SuccessPayedIcon/>

        <Text style={[fonts.H2, {marginBottom: 80}]}>
          Оплата прошла успешно
        </Text>

        <View>
          <View style={styles.checkContainer}>
            <CheckIcon fill={iconFill}/>
          </View>
          <Text style={[fonts.b2, {textAlign: 'center', marginTop: 8}]}>
            Чек
          </Text>
        </View>
      </View>
      <View style={{marginBottom: 64, paddingHorizontal: 16}}>
        <AppBtn onPress={()=> navigation.navigate('PistolScreen')} text={'Далее'}/>
      </View>
    </View>
  );
};

export default SuccessPayedScreen;


const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getColor('white', 'bg')
    },
    checkContainer:{
      backgroundColor: getColor('white', 'black'),
      padding: 16,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#DBDBDB'
    },
    wrapper:{
      flex: 1,
      backgroundColor: getColor('white', 'bg'),
    }
  });
