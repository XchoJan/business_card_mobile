import React, { useCallback, useState } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import Api from '../../../Api';
import BackIcon from '../../../assets/icons/BackIcon';
import AppInput from '../../../components/AppInput.tsx';
import RightArrow from '../../../assets/icons/RightArrow';
import HideTabBar from '../../../components/HideTabBar.tsx';
import AppBtn from '../../../components/AppBtn.tsx';
import Modal from 'react-native-modal';
import PassHideIcon from '../../../assets/icons/PassHideIcon';
import PassShowIcon from '../../../assets/icons/PassShowIcon';
import VisaIcon from '../../../assets/icons/VisaIcon';

const ReplenishScreen = () => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const navigation = useNavigation<any>();

  const [value, setValue] = useState<string | number>('');
  const [visible, setVisible] = useState(false);
  const [editingCard, setEditingCard] = useState<any | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);

  const parseExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 4) {
      return {
        expiration_month: digits.slice(0, 2),
        expiration_year: digits.slice(2, 4),
      };
    }
    const parts = value.split('/');
    if (parts.length === 2) {
      return {
        expiration_month: parts[0].trim().padStart(2, '0'),
        expiration_year: parts[1].trim().slice(-2),
      };
    }
    return { expiration_month: '', expiration_year: '' };
  };

  const formatExpiryInput = (text: string, previous: string) => {
    let digits = text.replace(/\D/g, '').slice(0, 4);

    // при удалении «/» убираем и последнюю цифру месяца (07/ → 0)
    if (
      previous.length > text.length &&
      previous.includes('/') &&
      !text.includes('/')
    ) {
      digits = previous.replace(/\D/g, '').slice(0, -1);
    }

    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleExpiryChange = (text: string) => {
    setExpiry(formatExpiryInput(text, expiry));
  };

  const mapCardFromApi = (c: any) => {
    const rawNumber = c?.card_number ?? c?.number ?? '';
    const last4 =
      c?.last4 ??
      c?.last_four ??
      (rawNumber ? String(rawNumber).replace(/\s/g, '').slice(-4) : '');

    const month = c?.expiration_month ?? '';
    const year = c?.expiration_year ?? '';
    const expiryLabel =
      month && year ? `${month}/${year}` : c?.expiry ?? '';

    return {
      id: String(c?.id ?? c?.card_id ?? c?.uuid ?? last4 ?? Date.now()),
      number: last4,
      expiry: expiryLabel,
      cardholder_name: c?.cardholder_name,
      ...c,
    };
  };

  const loadCards = useCallback(async () => {
    try {
      const response = await Api.getCards();
      const list = response?.data?.data ?? response?.data ?? [];
      const cardsList = Array.isArray(list) ? list : list?.cards ?? [];
      const mapped = (cardsList || []).map(mapCardFromApi);
      console.log('[Card] list loaded', {
        status: response?.status,
        count: mapped.length,
      });
      setCards(mapped);
    } catch (e: any) {
      console.error('[Card] list error', {
        status: e?.response?.status,
        data: e?.response?.data,
        message: e?.message,
      });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCards().then();
    }, [loadCards]),
  );

  const resetCardForm = () => {
    setCardNumber('');
    setCardholderName('');
    setExpiry('');
    setCvv('');
    setShowCvv(false);
    setEditingCard(null);
  };

  const closeCardModal = () => {
    Keyboard.dismiss();
    setVisible(false);
    resetCardForm();
  };

  const maskCardBodyForLog = (body: Record<string, string>) => ({
    ...body,
    card_number: body.card_number
      ? `****${String(body.card_number).slice(-4)}`
      : '',
    cvc: body.cvc ? '***' : '',
  });

  const openAddCardModal = () => {
    console.log('[Card] open modal: create');
    resetCardForm();
    setEditingCard(null);
    setVisible(true);
  };

  const openEditCardModal = (card: any) => {
    console.log('[Card] open modal: edit', {
      cardId: card?.id ?? card?.card_id,
      last4: card?.number,
      cardholder_name: card?.cardholder_name,
      expiry: card?.expiry,
    });
    const month = card?.expiration_month ?? '';
    const year = card?.expiration_year ?? '';
    const expiryValue =
      card?.expiry ??
      (month && year ? `${month}/${year}` : '');

    setEditingCard(card);
    setCardNumber(
      card?.card_number ? String(card.card_number).replace(/\s/g, '') : '',
    );
    setCardholderName(card?.cardholder_name ?? '');
    setExpiry(expiryValue);
    setCvv('');
    setShowCvv(false);
    setVisible(true);
  };

  const buildCardBody = () => {
    const digitsOnly = cardNumber.replace(/\s/g, '');
    const { expiration_month, expiration_year } = parseExpiry(expiry);

    return {
      body: {
        gateway_name: editingCard?.gateway_name ?? 'default',
        cardholder_name: cardholderName.trim(),
        cvc: cvv.trim(),
        card_number: digitsOnly,
        expiration_year: String(expiration_year),
        expiration_month: String(expiration_month),
      },
      digitsOnly,
      expiration_month,
      expiration_year,
    };
  };

  const handleSaveCard = async () => {
    const isEdit = Boolean(editingCard?.id);
    const cardId = editingCard?.id;
    const { body, digitsOnly, expiration_month, expiration_year } =
      buildCardBody();

    if (
      digitsOnly.length < 12 ||
      !cardholderName.trim() ||
      !expiration_month ||
      !expiration_year ||
      cvv.length < 3
    ) {
      console.warn('[Card] validation failed', {
        mode: isEdit ? 'edit' : 'create',
        cardId,
        cardNumberLen: digitsOnly.length,
        hasCardholder: Boolean(cardholderName.trim()),
        expiration_month,
        expiration_year,
        cvvLen: cvv.length,
      });
      return;
    }

    console.log('[Card] request start', {
      mode: isEdit ? 'edit' : 'create',
      cardId,
      payload: maskCardBodyForLog(body),
    });

    try {
      setIsSaving(true);
      const response = isEdit
        ? await Api.updateCard(cardId, body)
        : await Api.createCard(body);

      console.log('[Card] success', {
        mode: isEdit ? 'edit' : 'create',
        cardId,
        status: response?.status,
        data: response?.data,
      });

      await loadCards();
      closeCardModal();
    } catch (e: any) {
      console.error('[Card] error', {
        mode: isEdit ? 'edit' : 'create',
        cardId,
        status: e?.response?.status,
        data: e?.response?.data,
        message: e?.message,
      });
    } finally {
      setIsSaving(false);
      console.log('[Card] request end', {
        mode: isEdit ? 'edit' : 'create',
        cardId,
      });
    }
  };

  const handleDeleteCard = async () => {
    const cardId = editingCard?.id;
    if (!cardId) return;

    console.log('[Card] delete start', { cardId });

    try {
      setIsDeleting(true);
      const response = await Api.deleteCard(cardId);

      console.log('[Card] delete success', {
        cardId,
        status: response?.status,
        data: response?.data,
      });

      await loadCards();
      closeCardModal();
    } catch (e: any) {
      console.error('[Card] delete error', {
        cardId,
        status: e?.response?.status,
        data: e?.response?.data,
        message: e?.message,
      });
    } finally {
      setIsDeleting(false);
      console.log('[Card] delete end', { cardId });
    }
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
                <Pressable
                  onPress={() => openEditCardModal(item)}
                  style={styles.cardItem}
                >
                  <VisaIcon/>
                  <View style={{ flex: 1 }}>
                    <Text style={fonts.b2}>Карта •••• {item.number}</Text>
                    <Text style={fonts.b3}>Срок: {item.expiry}</Text>
                  </View>
                </Pressable>
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
              onPress={openAddCardModal}
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
        onBackdropPress={closeCardModal}
        onSwipeComplete={closeCardModal}
        swipeDirection="down"
        style={{ margin: 0, justifyContent: 'flex-end' }}
        isVisible={visible}
        avoidKeyboard={true}
        onModalHide={() => {
          Keyboard.dismiss();
          if (!visible) resetCardForm();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalHandle} />
            </TouchableWithoutFeedback>

            <ScrollView
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalContent}
              nestedScrollEnabled={true}
              style={styles.scrollView}
            >
              {editingCard && (
                <Text style={[fonts.H3, { marginBottom: 16, textAlign: 'center' }]}>
                  Редактирование карты
                </Text>
              )}

              <View>
                <AppInput
                  placeholder={'Номер карты'}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={{ marginTop: 12 }} />

              <AppInput
                placeholder={'Имя держателя карты'}
                value={cardholderName}
                onChangeText={setCardholderName}
              />

              <View style={styles.inputs}>
                <View style={{ width: '48%' }}>
                  <AppInput
                    placeholder={'Срок действия (MM/YY)'}
                    value={expiry}
                    onChangeText={handleExpiryChange}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View style={{ width: '48%' }}>
                  <AppInput
                    placeholder={'CVV/CVC'}
                    icon={
                      !showCvv ? (
                        <PassHideIcon fill={'#777'} />
                      ) : (
                        <PassShowIcon fill={'#777'} />
                      )
                    }
                    onPressIcon={() => setShowCvv(!showCvv)}
                    passInput={!showCvv}
                    maxLength={3}
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                  />
                  <Text style={fonts.b3}>3 цифры на обороте</Text>
                </View>
              </View>

              <View style={{ marginTop: 24, marginBottom: editingCard ? 12 : 24 }}>
                <AppBtn
                  onPress={handleSaveCard}
                  text={
                    isSaving
                      ? 'Сохранение...'
                      : editingCard
                        ? 'Сохранить изменения'
                        : 'Добавить карту'
                  }
                />
              </View>

              {editingCard && (
                <Pressable
                  onPress={handleDeleteCard}
                  disabled={isDeleting || isSaving}
                  style={[
                    styles.deleteBtn,
                    (isDeleting || isSaving) && styles.deleteBtnDisabled,
                  ]}
                >
                  <Text style={styles.deleteBtnText}>
                    {isDeleting ? 'Удаление...' : 'Удалить карту'}
                  </Text>
                </Pressable>
              )}
            </ScrollView>
          </View>
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
      flex: 1,
    },
    modal: {
      width: '100%',
      backgroundColor: '#fff',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      paddingTop: 12,
      flex: 1,
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: '#DBDBDB',
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    scrollView: {
      flex: 1,
    },
    modalContent: {
      paddingHorizontal: 16,
      paddingBottom: Platform.OS === 'ios' ? 60 : 50,
      flexGrow: 1,
    },
    inputs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    deleteBtn: {
      marginBottom: 24,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: '#D64545',
      alignItems: 'center',
    },
    deleteBtnDisabled: {
      opacity: 0.7,
    },
    deleteBtnText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
  });
