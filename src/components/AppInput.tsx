import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';

interface inputProps {
  value?: any;
  onChangeText?: (value: any) => void;
  placeholder?: string;
  icon?: any;
  onPressIcon?: () => void;
  passInput?: boolean;
  label?: string;
  maxLength?: number;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const AppInput = ({
  value,
  onChangeText,
  placeholder,
  icon,
  onPressIcon,
  passInput,
  label,
  maxLength,
  keyboardType,
  autoCapitalize,
}: inputProps) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {label && <Text style={[fonts.b2, {marginBottom: 8}]}>{label}</Text>}
      <View style={[styles.container, isFocused && styles.isFocused]}>
        <TextInput
          secureTextEntry={passInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme === 'light' ? '#777777' : '#FFFFFF'}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        <Pressable onPress={onPressIcon}>{icon}</Pressable>
      </View>
    </View>
  );
};

export default AppInput;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 56,
      borderRadius: 12,
      backgroundColor: getColor('secondaryLightGrey', 'secondaryDarkGrey'),
      justifyContent: 'space-between',
      paddingLeft: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    input: {
      width: '80%',
      height: '100%',
      color: getColor('black', 'white'),
    },
    placeholderStyles: {
      color: getColor('grey', 'white'),
    },
    isFocused: {
      borderWidth: 1,
      borderColor: getColor('blue', 'blue'),
    },
  });
