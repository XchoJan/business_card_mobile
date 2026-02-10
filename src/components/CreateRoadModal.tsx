import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View, Text, Pressable, Touchable, TouchableOpacity } from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';

const CreateRoadModal = ({
                           onPressCancel,
                           isVisibleRoad,
  onClose
}: any) => {
  const { styles, fonts } = useStyles(createStyles);


  return (
    <Modal isVisible={isVisibleRoad} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={[fonts.H4, {textAlign: 'center', marginVertical: 24}]}>
            Выберите приложение для навигации
          </Text>

          <View style={styles.line}/>
          <Pressable>
            <Text style={[fonts.button, styles.cancel,  {marginVertical: 16, textAlign: 'center'}]}>Google Maps</Text>
          </Pressable>

          <View style={[styles.line]}/>
          <Pressable>
            <Text style={[fonts.button, styles.cancel,  {marginVertical: 16, textAlign: 'center'}]}>Яндекс Навигатор</Text>
          </Pressable>

        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={onPressCancel} style={styles.bottomContainer}>
          <View>
            <Text style={[fonts.button, styles.cancel]}>Отменить</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CreateRoadModal;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      bottom: 0,
      position: 'absolute',
      width: '100%',
    },
    topContainer: {
      width: '100%',
      height: 188,
      backgroundColor: '#fff',
      marginBottom: 16,
      borderRadius: 16,
      paddingHorizontal: 16
    },
    bottomContainer: {
      width: '100%',
      height: 56,
      backgroundColor: '#fff',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancel: {
      color: getColor('blue', 'white'),
    },
    line:{
      height: 1,
      width: '100%',
      backgroundColor: '#DBDBDB',
    }
  });
