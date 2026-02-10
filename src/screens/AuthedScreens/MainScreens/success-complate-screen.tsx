import React from 'react';
import { useNavigation } from '@react-navigation/core';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { Image, StyleSheet, Text, View } from 'react-native';
import MinDramIcon from '../../../assets/icons/MinDramIcon';
import CircleIconBtn from '../../../components/CircleIconBtn.tsx';
import MessageIcon from '../../../assets/icons/MessageIcon';
import CheckIcon from '../../../assets/icons/CheckIcon';
import AppBtn from '../../../components/AppBtn.tsx';
import { useDispatch } from 'react-redux';
import { setTabBarVisible } from '../../../store/features/booleans/tabBarVisible.ts';

const SuccessComplateScreen = () => {
  const { styles, fonts, theme } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  let iconFill = theme === 'light' ? '#0D0D0D' : '#CDCDCD'
  const dispatch = useDispatch()
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/picture.png')}
          style={styles.image}
        />
        <Text style={[fonts.H2, { marginBottom: 12 }]}>Заправка завершена</Text>

        <Text style={[fonts.H2, styles.description]}>
          - 13 300 <MinDramIcon /> / 70 л
        </Text>

        <View style={styles.btns}>
          <CircleIconBtn title={'Чек'} icon={<CheckIcon fill={iconFill} />} />
          <CircleIconBtn
            title={'Отправить чек на почту'}
            icon={<MessageIcon fill={iconFill} />}
          />
        </View>
      </View>

      <View style={{ marginBottom: 54, paddingHorizontal: 16 }}>
        <AppBtn
          onPress={() => {
            dispatch(setTabBarVisible(true))
            navigation.navigate('MapMainScreen');
          }}
          text={'Готово'}
        />
      </View>
    </View>
  );
};

export default SuccessComplateScreen;


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
    image:{
      marginBottom: 24
    },
    description:{
      color: getColor('grey', 'grey2')
    },
    btns: {
      flexDirection: 'row',
      gap: 55,
      marginTop: 24
    }
  });

