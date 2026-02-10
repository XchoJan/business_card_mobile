import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  Platform,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';

let Tab = createBottomTabNavigator();

import ProfileNavigator from '../TabNavigators/profile-navigator.tsx';
import MainNavigator from '../TabNavigators/main-navigator.tsx';
import WalletNavigator from '../TabNavigators/wallet-navigator.tsx';
import { useSelector } from 'react-redux';
import PassHideIcon from '../../assets/icons/PassHideIcon';
import PassShowIcon from '../../assets/icons/PassShowIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import useStyles, { ColorsEnum } from '../../hooks/useStyles.ts';
import MapIcon from '../../assets/icons/MapIcon';
import WalletIcon from '../../assets/icons/WalletIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabIconWithBackground: React.FC<{
  focused: boolean;
  icon: React.ReactNode;
  title: string;
}> = ({ focused, icon, title }) => {
  const { theme } = useStyles(() => ({}));

  // Цвет текста в зависимости от темы и состояния
  const textColor =
    theme === 'light'
      ? focused
        ? '#367FA9'
        : '#777777'
      : focused
        ? '#367FA9'
        : '#CDCDCD';

  return (
    <View style={{ width: 84, alignItems: 'center' }}>
      <View
        style={{
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          maxWidth: 64,
          paddingVertical: 8,
          height: 32,
        }}
      >
        {icon}
      </View>
      <Text style={{ color: textColor, textAlign: 'center' }}>{title}</Text>
    </View>
  );
};


const AuthorizedNavigations = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#367FA9' : '#367FA9';
  let tabBarTheme = theme === 'light' ? '#FFFFFF' : '#161616';

  const showTabBar = useSelector((store:any) => store.tabBarVisible.tabBarVisible)


  const insets = useSafeAreaInsets();
  const tabHeight = Platform.OS === 'android'
    ? insets.bottom > 0 ? 118 : 118
    : 84;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarTheme,
          paddingTop: 18,
          display: showTabBar ? 'flex' : 'none',
          height: tabHeight,

        },
      }}
      initialRouteName={'WalletNavigator'}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }: any) => (
            <TabIconWithBackground
              title={'Кошелёк'}
              focused={focused}
              icon={
                focused ? (
                  <WalletIcon fill={iconFill} />
                ) : (
                  <WalletIcon fill={iconFill} />
                )

              }
            />
          ),
          tabBarShowLabel: false,
        }}
        name="WalletNavigator"
        component={WalletNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }: any) => (
            <TabIconWithBackground
              title={'Карта АЗС'}
              focused={focused}
              icon={
                focused ? (
                  <MapIcon fill={iconFill} />
                ) : (
                  <MapIcon fill={iconFill} />
                )
              }
            />
          ),
          tabBarShowLabel: false,
        }}
        name="MainNavigator"
        component={MainNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }: any) => (
            <TabIconWithBackground
              title={'Профиль'}
              focused={focused}
              icon={
                focused ? (
                  <ProfileIcon fill={iconFill} />
                ) : (
                  <ProfileIcon fill={iconFill} />
                )
              }
            />
          ),
          tabBarShowLabel: false,
        }}
        name="ProfileNavigator"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default AuthorizedNavigations;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) => StyleSheet.create({});
