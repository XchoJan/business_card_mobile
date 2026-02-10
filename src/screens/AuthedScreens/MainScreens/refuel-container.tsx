import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import BackIcon from '../../../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/core';
import AppBtn from '../../../components/AppBtn.tsx';
import Dram from '../../../assets/icons/Dram';

interface RefuelContainerProps {
  children?: any;
  title?: string;
  disabled?: boolean;
  description?: string;
  btnTitle?: string;
  onPress?: any;
  childMargin?: number
  showAgreements?: boolean;
  hideButton?: boolean;
}

const RefuelContainer = ({
  children,
  title,
  disabled,
  description,
  btnTitle,
  onPress,
  childMargin,
                           showAgreements,
                           hideButton
}: RefuelContainerProps) => {

  const { styles, fonts, theme } = useStyles(createStyles);
  const navigation = useNavigation();
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD';

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackIcon fill={iconFill} />
          </Pressable>

          <Text style={fonts.H3}>{title}</Text>

          <View style={{ width: 20, height: 20 }} />
        </View>
        {description && (
          <View style={{ marginBottom: 24 }}>
            {description && (
              <Text
                style={[fonts.b2, { textAlign: 'center', marginBottom: 22 }]}
              >
                {description}
              </Text>
            )}
            <Text style={[fonts.H1, { textAlign: 'center' }]}>
              13 560,23 <Dram fill={theme === 'light' ? '#000' : '#fff'} />
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.child, { marginTop: childMargin }]}>
        <View style={{ flex: 1 }}>{children}</View>
        <View
          style={{
            paddingBottom: 50,
            paddingHorizontal: 16,
          }}
        >
          {!hideButton &&
            <AppBtn
              onPress={onPress}
              disabled={disabled}
              text={btnTitle ? btnTitle : 'Далее'}
            />
          }
          {showAgreements && (
            <View style={styles.btnContainer}>
              <Text style={[fonts.b3, { textAlign: 'center' }]}>
                Нажимая на кнопку вы принимаете условия
              </Text>
              <Text style={[fonts.b3, { textAlign: 'center' }]}>
                Обработки персональных данных, а также Условия продажи
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default RefuelContainer;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    btnContainer:{
      backgroundColor: getColor('white', 'black'),
      marginTop: 14
    },
    container: {
      flex: 1,
      backgroundColor: getColor('bg', 'bg'),
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 55,
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    child: {
      flex: 1,
      backgroundColor: getColor('white', 'black'),

    },
  });
