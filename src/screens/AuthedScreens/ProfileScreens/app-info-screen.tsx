import React from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import ProfileContainer from '../../../components/ProfileContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import PhoneMaskInput from '../../../components/PhoneMaskInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import HideTabBar from '../../../components/HideTabBar.tsx';
import AppLogo from '../../../assets/icons/AppLogo';
import SelectableItems from '../../../components/SelectableItems.tsx';

const AppInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { styles, theme, fonts } = useStyles(createStyles);


  return (
    <ProfileContainer title={'О приложении'} showBack>
      <View style={styles.container}>
        <AppLogo/>
        <Text style={[fonts.H4, {marginTop: 14}]}>
          Бизнес карта
        </Text>
        <Text style={fonts.b3}>
          Версия приложения 4.2.0
        </Text>
      </View>
      <View style={{gap: 34}}>
        <SelectableItems text={'Политика конфиденциальности'}/>
        <SelectableItems text={'Условия обработки персональных данных'}/>
      </View>
      <HideTabBar/>
    </ProfileContainer>
  );
};

export default AppInfoScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginBottom: 24

    },
    label: {},
  });
