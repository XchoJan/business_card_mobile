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
import Api from '../../../Api';

const CreateDriverScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const [showPass, setShowPass] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    const body = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      client_vehicle_id: null,
    };

    if (!body.first_name || !body.last_name || !body.email || !body.password) return;

    try {
      const response = await Api.createDriver(body);
      const created = response?.data?.data || {};

      dispatch(
        addDriver({
          id: String(created?.id || Date.now()),
          ...body,
          ...created,
        }),
      );
      navigation.goBack();
    } catch (e: any) {
      console.log(e?.response?.data ?? e?.message ?? e);
    }
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
              placeholder={'Имя'}
              value={firstName}
              onChangeText={setFirstName}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Фамилия'}
              value={lastName}
              onChangeText={setLastName}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Почта'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
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

