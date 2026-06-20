import React, { useEffect, useState } from 'react';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { ScrollView, StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import AuthContainer from '../../../components/AuthContainer.tsx';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import PaddingContainer from '../../../components/PaddingContainer.tsx';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../store/features/token/tokenSlice.ts';
import { appConfig } from '../../../core/constants/app-config';
import Api from '../../../Api';
import { TokensRepository } from '../../../helpers/tokens-repository.ts';

const CompanyDataScreen = ({route}: any) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const password = route?.params?.password;
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [inn, setInn] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [bik, setBik] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [correspondentAccount, setCorrespondentAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [address, setAddress] = useState('');
  const emailFromReducer = useSelector((store: any) => store.emailOrPhone.emailOrPhone);
  const [email, setEmail] = useState(emailFromReducer || '');
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    appConfig.deviceId
      .then(id => {
        if (id) {
          setDeviceId(id);
        }
      })
      .catch(error => {
        console.log('Failed to get deviceId', error);
      });
  }, []);

  const handleSaveCompanyData = async (client_type: string) => {
    const resolvedDeviceId = deviceId || (await appConfig.deviceId);
    const trimmedEmail = (email || '').trim();
    const trimmedName = (name || '').trim();
    const trimmedLastName = (lastName || '').trim();
    const trimmedInn = (inn || '').trim();
    const trimmedCompanyName = (companyName || '').trim();

    const dataCompany = {
      name: trimmedName,
      last_name: trimmedLastName,
      device_id: resolvedDeviceId,
      alpha2: 'AM',
      email: trimmedEmail,
      password: password,
      client_type: 'company',
      reg_number: trimmedInn,
      company_name: trimmedCompanyName,
    }

    const dataIndividual = {
      device_id: resolvedDeviceId,
      alpha2: 'AM',
      email: trimmedEmail,
      password: password,
      client_type: client_type,
      name: trimmedName,
      last_name: trimmedLastName,
    }

    console.log(dataIndividual);

    try {
      const response = await Api.createUser(client_type === 'individual'
        ? dataIndividual : dataCompany);
      console.log(response.data.data.tokens.access_token, 'Response save company');
      TokensRepository.setAccessToken(response.data.data.tokens.access_token)
      dispatch(setToken(response.data.data.tokens.access_token));
    }catch (e: any){
      console.log(e.response, 'Error save company');
    }
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
                placeholder={'Почта'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Имя'}
                value={name}
                onChangeText={setName}
              />

              <View style={{ marginBottom: 12 }} />

              <AppInput
                placeholder={'Фамилия'}
                value={lastName}
                onChangeText={setLastName}
              />

              <View style={{ marginBottom: 12 }} />

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
                  onPress={() => handleSaveCompanyData('company')}
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
                  onPress={()=> handleSaveCompanyData('individual')}
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

