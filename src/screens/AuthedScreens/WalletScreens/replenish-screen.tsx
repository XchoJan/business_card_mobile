import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import BackIcon from '../../../assets/icons/BackIcon';
import AppInput from '../../../components/AppInput.tsx';
import RightArrow from '../../../assets/icons/RightArrow';
import HideTabBar from '../../../components/HideTabBar.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import Modal from 'react-native-modal';
import PassShowIcon from '../../../assets/icons/PassShowIcon';
import VisaIcon from '../../../assets/icons/VisaIcon';

const ReplenishScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const navigation = useNavigation<any>();

  const [value, setValue] = useState<string | number>('');
  const [visible, setVisible] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    if (cardNumber.length < 12 || expiry.length < 4 || cvv.length < 3) return;

    const last4 = cardNumber.slice(-4);
    const newCard = {
      id: Date.now(),
      number: last4,
      expiry,
    };``

    setCards(prev => [newCard, ...prev]);
    setVisible(false);
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon fill={iconFill} />
        </Pressable>

        <Text style={fonts.H3}>Пополнение</Text>

        <View style={{ width: 20, height: 20 }} />
      </View>

      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: theme === 'light' ? '#fff' : '#161616' },
        ]}
      >
        <View style={styles.inputBox}>
          <AppInput
            placeholder={'Сумма'}
            value={value}
            onChangeText={setValue}
          />
        </View>

        {/* Список добавленных карт */}
        {cards.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <FlatList
              data={cards}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.cardItem}>
                  <VisaIcon/>
                  <View style={{ flex: 1 }}>
                    <Text style={fonts.b2}>Карта •••• {item.number}</Text>
                    <Text style={fonts.b3}>Срок: {item.expiry}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <View style={{ gap: 24, flex: 1 }}>
            <TouchableOpacity style={styles.btn}>
              <Text style={fonts.b2}>Добавить банк с СБП</Text>
              <RightArrow fill={iconFill} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.btn}
            >
              <Text style={fonts.b2}>Добавить банковскую карту</Text>
              <RightArrow fill={iconFill} />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 64 }}>
            <AppBtn
              text={'Пополнить'}
              onPress={() => {
                navigation.navigate('ReplenishmentDetailsScreen');
              }}
            />
          </View>
        </View>
      </View>

      {/* Модалка добавления карты */}
      <Modal
        onBackdropPress={() => {
          Keyboard.dismiss();
          setVisible(false);
        }}
        onSwipeComplete={() => {
          Keyboard.dismiss();
          setVisible(false);
        }}
        swipeDirection="down"
        style={{ margin: 0, justifyContent: 'flex-end' }}
        isVisible={visible}
        avoidKeyboard={true}
        onModalHide={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modal}>
              <View style={styles.modalHandle} />

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.modalContent}
              >
                <View>
                  <AppInput
                    placeholder={'Номер карты'}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                    maxLength={16}
                  />
                </View>

                <View style={styles.inputs}>
                  <View style={{ width: '48%' }}>
                    <AppInput
                      placeholder={'Срок действия'}
                      value={expiry}
                      onChangeText={setExpiry}
                    />
                  </View>
                  <View style={{ width: '48%' }}>
                    <AppInput
                      placeholder={'CVV/CVC'}
                      icon={<PassShowIcon fill={'#777'} />}
                      passInput={true}
                      maxLength={3}
                      value={cvv}
                      onChangeText={setCvv}
                      keyboardType="numeric"
                    />
                    <Text style={fonts.b3}>3 цифры на обороте</Text>
                  </View>
                </View>

                <View style={{ marginTop: 24, marginBottom: 24 }}>
                  <AppBtn onPress={handleAddCard} text={'Добавить карту'} />
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
      <HideTabBar />
    </View>
  );
};

export default ReplenishScreen;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? 34 : 48,
      backgroundColor: getColor('bg', 'bg'),
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 32,
      paddingHorizontal: 16,
      marginBottom: 14,
      width: '100%',
    },
    bottomContainer: {
      flex: 1,
      width: '100%',
      marginTop: 24,
      paddingHorizontal: 16,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    inputBox: {
      marginTop: 16,
      marginBottom: 24,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      gap: 8
    },
    cardIcon: {
      width: 40,
      height: 25,
      backgroundColor: 'red',
      borderRadius: 4,
      marginRight: 10,
    },
    modalContainer: {
      maxHeight: '90%',
    },
    modal: {
      width: '100%',
      backgroundColor: '#fff',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: '#DBDBDB',
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    modalContent: {
      paddingBottom: 16,
    },
    inputs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
  });
