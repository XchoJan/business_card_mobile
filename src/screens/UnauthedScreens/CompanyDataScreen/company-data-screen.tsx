import React, { useState } from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { ScrollView, StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import AuthContainer from '../../../components/AuthContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import PaddingContainer from '../../../components/PaddingContainer.tsx';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../store/features/token/tokenSlice.ts';

const CompanyDataScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [inn, setInn] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [bik, setBik] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [correspondentAccount, setCorrespondentAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [address, setAddress] = useState('');

  const handleContinueAsIndividual = () => {
    // Устанавливаем моковый токен как при входе
    dispatch(setToken('KJASHDKAJSD'));
  };

  const handleSaveCompanyData = () => {
    // Здесь можно добавить валидацию и сохранение данных
    // Пока просто устанавливаем токен
    dispatch(setToken('KJASHDKAJSD'));
  };

  return (
    <AuthContainer showBack title={'Данные юридического лица'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
        >
          <PaddingContainer>
            <View style={styles.inputsContainer}>
              <AppInput
                placeholder={'ИНН'}
                value={inn}
                onChangeText={setInn}
                keyboardType="numeric"
                maxLength={12}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Название организации'}
                value={companyName}
                onChangeText={setCompanyName}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'БИК'}
                value={bik}
                onChangeText={setBik}
                keyboardType="numeric"
                maxLength={9}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Расчетный счет'}
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
                maxLength={20}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Корреспондентский счет'}
                value={correspondentAccount}
                onChangeText={setCorrespondentAccount}
                keyboardType="numeric"
                maxLength={20}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Название банка'}
                value={bankName}
                onChangeText={setBankName}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Адрес'}
                value={address}
                onChangeText={setAddress}
              />

              <View style={{ marginTop: 24 }}>
                <AppBtn
                  onPress={handleSaveCompanyData}
                  text={'Сохранить'}
                />
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={[fonts.b3, styles.dividerText]}>или</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={{ marginTop: 12, marginBottom: 40 }}>
                <AppBtn
                  onPress={handleContinueAsIndividual}
                  text={'Продолжить как физ лицо'}
                />
              </View>
            </View>
          </PaddingContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthContainer>
  );
};

export default CompanyDataScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
      marginBottom: 180,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: Platform.OS === 'ios' ? 50 : 40,
      flexGrow: 1,
    },
    inputsContainer: {
      paddingTop: 28,
      width: '100%',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: getColor('grey2', 'grey2'),
    },
    dividerText: {
      marginHorizontal: 16,
      color: getColor('grey', 'grey'),
    },
  });

