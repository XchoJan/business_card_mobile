import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';

const HistoryItemScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const navigation = useNavigation<any>();

  return (
    <View>

    </View>
  );
};

export default HistoryItemScreen;


const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? 34 : 48,
      backgroundColor: getColor('bg', 'bg'),
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 42,
      paddingHorizontal: 16,
      marginBottom: 24,
      width: '100%',
    },
    bottomContainer: {
      flex: 1,
      width: '100%',
      marginTop: 24,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      padding: 16,
    },
    desc: {
      color: getColor('grey', 'white'),
    },
    price: {
      color: getColor('green', 'green'),
      marginVertical: 12,
    },
    btns: {
      flexDirection: 'row',
      gap: 55,
      marginTop: 24,
    },
    line:{
      backgroundColor: getColor('grey2', 'grey2'),
      width: '100%',
      height: 1,
      marginVertical: 12
    }
  });

