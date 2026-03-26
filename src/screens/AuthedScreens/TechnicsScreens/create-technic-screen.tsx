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
import { addTechnic } from '../../../store/features/technics/technicsSlice.ts';
import AppInput from '../../../components/AppInput.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import BackIcon from '../../../assets/icons/BackIcon';
import PaddingContainer from '../../../components/PaddingContainer.tsx';

const CreateTechnicScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';

  const [carNumber, setCarNumber] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');

  const handleSave = () => {
    if (!carNumber.trim()) return;

    const newTechnic = {
      id: Date.now().toString(),
      carNumber: carNumber.trim(),
      model: model.trim() || undefined,
      brand: brand.trim() || undefined,
      year: year.trim() || undefined,
      vin: vin.trim() || undefined,
    };

    dispatch(addTechnic(newTechnic));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon fill={iconFill} />
        </Pressable>
        <Text style={fonts.H3}>Добавить технику</Text>
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
              placeholder={'Номер машины'}
              value={carNumber}
              onChangeText={setCarNumber}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Марка'}
              value={brand}
              onChangeText={setBrand}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Модель'}
              value={model}
              onChangeText={setModel}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'Год выпуска'}
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              maxLength={4}
            />

            <View style={{ marginBottom: 12 }} />

            <AppInput
              placeholder={'VIN номер'}
              value={vin}
              onChangeText={setVin}
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

export default CreateTechnicScreen;

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

