import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';

interface CircleIconBtnProps {
  title?: string;
  icon?: React.ReactNode;
}

const CircleIconBtn = ({ title, icon }: CircleIconBtnProps) => {
  const { styles, fonts, theme } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  let iconFill = theme === 'light' ? '#0D0D0D' : '#CDCDCD';

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} activeOpacity={0.6}>
        {icon}
      </TouchableOpacity>
      <View style={{ maxWidth: 100 }}>
        <Text style={[fonts.b2, { textAlign: 'center' }]}>{title}</Text>
      </View>
    </View>
  );
};

export default CircleIconBtn;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: getColor('white', 'black'),
      width: 56,
      height: 56,
      marginBottom: 8,
      borderColor: getColor('grey2', 'grey2'),
    },
    image: {
      marginBottom: 24,
    },
    description: {
      color: getColor('grey', 'grey2'),
    },
    wrapper:{
      alignItems: 'center',
    }
  });
