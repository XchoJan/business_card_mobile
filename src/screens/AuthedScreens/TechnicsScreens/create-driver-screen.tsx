import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { addDriver } from '../../../store/features/technics/technicsSlice.ts';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import BackIcon from '../../../assets/icons/BackIcon';
import PaddingContainer from '../../../components/PaddingContainer.tsx';
import PassHideIcon from '../../../assets/icons/PassHideIcon';
import PassShowIcon from '../../../assets/icons/PassShowIcon';

const CreateDriverScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const [showPass, setShowPass] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!phoneNumber.trim() || !password.trim()) return;

    const newDriver = {
      id: Date.now().toString(),
      phoneNumber: phoneNumber.trim(),
      password: password.trim(),
      name: name.trim() || undefined,
    };

    dispatch(addDriver(newDriver));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon fill={iconFill} />
        </Pressable>
        <Text style={fonts.H3}>Добавить водителя</Text>
        <View style={{ width: 20, height: 20 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PaddingContainer>
          <View style={styles.inputsContainer}>
            <AppInput
              placeholder={'Номер телефона'}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Пароль'}
              value={password}
              onChangeText={setPassword}
              passInput={!showPass}
              icon={
                !showPass ? (
                  <PassHideIcon fill={iconFill} />
                ) : (
                  <PassShowIcon fill={iconFill} />
                )
              }
              onPressIcon={() => setShowPass(!showPass)}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Имя (необязательно)'}
              value={name}
              onChangeText={setName}
            />

            <View style={{ marginTop: 24, marginBottom: 40 }}>
              <AppBtn onPress={handleSave} text={'Сохранить'} />
            </View>
          </View>
        </PaddingContainer>
      </ScrollView>
    </View>
  );
};

export default CreateDriverScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('bg', 'bg'),
      paddingTop: Platform.OS === 'android' ? 34 : 48,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 32,
      marginBottom: 24,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    inputsContainer: {
      paddingTop: 28,
      width: '100%',
    },
  });

