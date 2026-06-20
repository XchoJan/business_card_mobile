import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import ProfileContainer from '../../../components/ProfileContainer.tsx';
import SelectableItems from '../../../components/SelectableItems.tsx';
import BackIcon from '../../../assets/icons/BackIcon';
import PersonalDataIcon from '../../../assets/icons/PersonalDataIcon';
import ProfileWalletIcon from '../../../assets/icons/ProfileWalletIcon';
import AppInfoIcon from '../../../assets/icons/AppInfoIcon';
import ThemeIcon from '../../../assets/icons/ThemeIcon';
import LeaveProfileIcon from '../../../assets/icons/LeaveProfileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { clearUser, getUserDisplayName, setUser } from '../../../store/features/user/userSlice.ts';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import Api from '../../../Api';
import { setToken } from '../../../store/features/token/tokenSlice.ts';
import { setTheme } from '../../../store/features/theme/themeSlice.ts';
import { MmkvRepository } from '../../../helpers/mmkv-storage.ts';
import { TokensRepository } from '../../../helpers/tokens-repository.ts';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';

const ProfileMainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { styles, theme, fonts } = useStyles(createStyles);
  const user = useSelector((state: RootState) => state.user?.profile);
  const userName = getUserDisplayName(user) || 'Пользователь';

  const loadUser = useCallback(async () => {
    try {
      const response = await Api.getUserData();
      const profile =
        response?.data?.data?.user ??
        response?.data?.data ??
        response?.data?.user ??
        response?.data;
      dispatch(setUser(profile ?? null));
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      loadUser().then();
    }, [loadUser]),
  );

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    await MmkvRepository.setTheme(newTheme);
  };

  const handleLogout = () => {
    // чистим MMKV (включая токены) + сбрасываем redux token
    TokensRepository.clearAll();
    dispatch(clearUser());
    dispatch(setToken(''));
  };

  return (
    <ProfileContainer showData title={'Профиль'} userName={userName}>
      <StatusBar barStyle={theme=== 'dark' ? 'light-content' : 'dark-content'} translucent={true} backgroundColor={'red'} />

      <View style={{ gap: 34 }}>
        <SelectableItems
          icon={<PersonalDataIcon fill={'black'} />}
          text={'Личные данные'}
          onPress={()=> navigation.navigate('EditProfileScreen')}
        />
        <SelectableItems icon={<ProfileWalletIcon />} text={'Оплата'} />
        <SelectableItems
          icon={<AppInfoIcon />}
          text={'О приложении'}
          onPress={()=> navigation.navigate('AppInfoScreen')}
        />
        <SelectableItems
          icon={<ThemeIcon />}
          text={'Темная тема'}
          onPress={toggleTheme}
        />
        <SelectableItems
          icon={<LeaveProfileIcon />}
          text={'Выйти из профиля'}
          onPress={handleLogout}
        />
      </View>
    </ProfileContainer>
  );
};

export default ProfileMainScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) => StyleSheet.create({});
