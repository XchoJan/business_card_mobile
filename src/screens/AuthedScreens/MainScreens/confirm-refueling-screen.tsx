import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RefuelContainer from './refuel-container';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import MinDramIcon from '../../../assets/icons/MinDramIcon';

const ConfirmRefuelingScreen = () => {
  const { styles, fonts, theme } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD'


  return (
    <RefuelContainer
      btnTitle={'Оплатить'}
      description={'Баланс'}
      title={'АИ-95'}
      onPress={()=> navigation.navigate('SuccessPayedScreen')}
    >
      <View style={styles.container}>
        <Text style={fonts.H4}>АЗС</Text>
        <Text style={fonts.H5}>АЗС 047, г. Ереван, просп. Аршакуняц, 34/16</Text>

        <View style={styles.line}/>
        <Text style={fonts.H4}>Колонка</Text>
        <Text style={fonts.H5}>№2</Text>

        <View style={styles.line}/>
        <Text style={fonts.H4}>Топливо</Text>
        <Text style={fonts.H5}>АИ-95</Text>

        <View style={styles.line}/>
        <Text style={fonts.H4}>Количество</Text>
        <Text style={fonts.H5}>70 л</Text>

        <View style={styles.line}/>
        <Text style={fonts.H4}>К оплате</Text>
        <Text style={fonts.H5}>13 300 <MinDramIcon/></Text>
      </View>

    </RefuelContainer>
  );
};

export default ConfirmRefuelingScreen;

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
      marginTop: 36
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: '#DBDBDB',
      marginVertical: 12
    }

  });
