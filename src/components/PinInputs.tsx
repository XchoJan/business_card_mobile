import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TextInputProps, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';

const CELL_COUNT = 6;

const autoComplete = Platform.select<TextInputProps['autoComplete']>({
  android: 'sms-otp',
  default: 'one-time-code',
});

const PinInputs = ({value, setValue}: any) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  return (
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={autoComplete}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused && <Cursor />)}
          </Text>
        )}
      />
  );
};

export default PinInputs;



const createStyles = (getColor: (light: ColorsEnum, dark: ColorsEnum) => string) =>
  StyleSheet.create({
    root: {flex: 1, padding: 16},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
      marginTop: 20,
      gap: 6
    },
    cell: {
      width: 44,
      height: 44,
      lineHeight: 38,
      fontSize: 18,
      borderWidth: 0,
      borderColor: '#00000030',
      color: getColor('black', 'white'), // text color
      backgroundColor: getColor('secondaryLightGrey', 'secondaryDarkGrey'),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 4
    },
    focusCell: {
      borderColor: '#000',
    },
  });
