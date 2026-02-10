import React from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import ProfileContainer from '../../../components/ProfileContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import PhoneMaskInput from '../../../components/PhoneMaskInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import { setTabBarVisible } from '../../../store/features/booleans/tabBarVisible.ts';
import HideTabBar from '../../../components/HideTabBar.tsx';

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { styles, theme, fonts } = useStyles(createStyles);



  return (
    <ProfileContainer title={'Личные данные'} showBack>
      <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
        <AppInput label={'Имя'} placeholder={'Имя'}/>
        <AppInput label={'Фамилия'} placeholder={'Фамилия'}/>
        <View>
          <Text style={[fonts.b2, {marginBottom: 8}]}>
            Номер телефона
          </Text>
          <PhoneMaskInput/>
        </View>
        <AppInput label={'Почта'} placeholder={'Почта'} />
      </ScrollView>

      <View style={{paddingBottom: 64}}>
        <AppBtn text={"Сохранить изменения"}/>
      </View>
      <HideTabBar/>
    </ProfileContainer>
  );
};

export default EditProfileScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      gap: 24,
      flex: 1
    },
    label: {},
  });
