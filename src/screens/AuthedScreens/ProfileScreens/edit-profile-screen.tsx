import React from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { RootState } from '../../../store/store.ts';
import ProfileContainer from '../../../components/ProfileContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import PhoneMaskInput from '../../../components/PhoneMaskInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import { setTabBarVisible } from '../../../store/features/booleans/tabBarVisible.ts';
import HideTabBar from '../../../components/HideTabBar.tsx';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { styles, theme, fonts } = useStyles(createStyles);
  const user = useSelector((state: RootState) => state.user?.profile);
  const firstName = user?.first_name ?? user?.name ?? '';
  const lastName = user?.last_name ?? '';

  return (
    <ProfileContainer title={'Личные данные'} showBack>
      <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
        <AppInput label={'Имя'} placeholder={'Имя'} value={firstName} />
        <AppInput label={'Фамилия'} placeholder={'Фамилия'} value={lastName} />
        <View>
          <Text style={[fonts.b2, {marginBottom: 8}]}>
            Номер телефона
          </Text>
          <PhoneMaskInput/>
        </View>
        <AppInput
          label={'Почта'}
          placeholder={'Почта'}
          value={user?.email ?? ''}
        />
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
