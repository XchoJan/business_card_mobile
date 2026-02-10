import React, { useState } from 'react';
import PhoneInput from 'react-native-international-phone-number';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';
import { StyleSheet } from 'react-native';

const PhoneMaskInput = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { styles, theme, fonts } = useStyles(createStyles);
  const [inputValue, setInputValue] = useState('');

  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  return (
    <PhoneInput
      phoneInputStyles={{
        container: {
          height: 56,
          borderWidth: 0,
          backgroundColor: theme === 'light' ? '#F1F3F4' : '#3A3A3A',
        },
        callingCode: {
          fontSize: 18,
          color: '#6B7280',
          fontWeight: '500',
        },
        input: {
          fontSize: 18,
          color: '#6B7280',
        },
        flagContainer: {
          backgroundColor: theme === 'light' ? '#F1F3F4' : '#3A3A3A',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          paddingRight: 4,
        },
      }}
      modalSearchInputPlaceholder={'Вводите страну'}
      customCaret={() => <></>}
      value={inputValue}
      onChangePhoneNumber={handleInputValue}
      selectedCountry={selectedCountry}
      onChangeSelectedCountry={handleSelectedCountry}
      placeholder={''}
      defaultCountry={'AM'}
    />
  );
};

export default PhoneMaskInput;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) => StyleSheet.create({});
