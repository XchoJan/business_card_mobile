import React from 'react';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppContainer from './AppContainer.tsx';
import { setTheme } from '../store/features/theme/themeSlice.ts';
import { MmkvRepository } from '../helpers/mmkv-storage.ts';
import { useDispatch } from 'react-redux';
import BackIcon from '../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/core';

interface AuthContainerProps {
  children: any;
  title?: string;
  description?: string;
  showBack?: boolean;
  onPressBack?: () => void;
}

const AuthContainer = ({
  children,
  title,
  description,
  showBack,
  onPressBack,
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
      <View style={styles.topContainer}>
        <Text style={[fonts.H1, { marginBottom: 12, textAlign: 'center' }]}>
          {title}
        </Text>
        <Text style={[fonts.b2, { textAlign: 'center' }]}>{description}</Text>
      </View>
      <View style={styles.bottomContainer}>{children}</View>
    </AppContainer>
  );
};

export default AuthContainer;

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
      height: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    back: {
      position: 'absolute',
      left: 18,
      top: 44,
    },
  });
