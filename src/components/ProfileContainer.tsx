import React from 'react';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppContainer from './AppContainer.tsx';
import { setTheme } from '../store/features/theme/themeSlice.ts';
import { MmkvRepository } from '../helpers/mmkv-storage.ts';
import { useDispatch } from 'react-redux';
import BackIcon from '../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/core';
import DefaultAvatar from '../assets/icons/DefaultAvatar';

interface AuthContainerProps {
  children: any;
  title?: string;
  showBack?: boolean;
  onPressBack?: () => void;
  topHeight?: number;
  showData?: boolean;
  userName?: string
}

const ProfileContainer = ({
  children,
  title,
  showBack,
  onPressBack,
  showData,
  userName
}: AuthContainerProps) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD';



  return (
    <AppContainer>
      {showBack && (
        <TouchableOpacity
          onPress={() => (onPressBack ? onPressBack() : navigation.goBack())}
          activeOpacity={0.6}
          style={styles.back}
        >
          <BackIcon fill={iconFill} />
        </TouchableOpacity>
      )}
      <View
        style={[styles.topContainer, { height: showData ? 262 : 140 }]}
      >
        <Pressable onPress={()=> navigation.goBack()}>
          <BackIcon/>
        </Pressable>

        <Text style={[fonts.H3, { marginBottom: 12, textAlign: 'center' }]}>
          {title}
        </Text>

        {showData && <View style={{}}>
          <View style={{alignItems: 'center'}}>
            <DefaultAvatar/>
          </View>

          <Text style={[fonts.H3,styles.name]}>
            {userName}
          </Text>
        </View>}
      </View>
      <View style={styles.bottomContainer}>{children}</View>
    </AppContainer>
  );
};

export default ProfileContainer;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    topContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: getColor('bg', 'bg'),
      height: 230,
      flexDirection: 'column',
      paddingBottom: 24,
    },
    bottomContainer: {
      backgroundColor: getColor('white', 'black'),
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: 16,
      paddingHorizontal: 16,
      flex: 1
    },
    back: {
      position: 'absolute',
      left: 18,
      top: 82,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 100,
      backgroundColor: 'red',
      alignSelf: 'center',
      marginBottom: 12
    },
    name:  {
      marginBottom: 12,
      textAlign: 'center',
      marginTop: 12
    },
    backIcon: {
      position: 'absolute',
      top: 24,
      left: 16
    }
  });
