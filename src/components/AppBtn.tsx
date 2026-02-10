import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';

interface AppBtnProps {
  text?: any
  onPress?: any
  disabled?: boolean
}

const AppBtn = ({
                  text,
                  onPress,
                  disabled
}: AppBtnProps) => {

  const { styles, theme, fonts } = useStyles(createStyles);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, disabled && {backgroundColor: '#93b1c2'}]}>
      <Text style={[fonts.button, styles.text]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AppBtn;


const createStyles = (getColor: (light: ColorsEnum, dark: ColorsEnum) => string) =>
  StyleSheet.create({
    container:{
      width: '100%',
      height: 56,
      backgroundColor: getColor('blue', 'blue'),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12
    },
    text:{
      color: getColor('white', 'white'),
    }
  });
