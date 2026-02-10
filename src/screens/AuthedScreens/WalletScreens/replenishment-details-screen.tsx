import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import HideTabBar from '../../../components/HideTabBar.tsx';
import BackIcon from '../../../assets/icons/BackIcon';
import useStyles, { ColorsEnum } from '../../../hooks/useStyles.ts';
import { useNavigation } from '@react-navigation/core';
import CircleIconBtn from '../../../components/CircleIconBtn.tsx';
import CheckIcon from '../../../assets/icons/CheckIcon';
import MessageIcon from '../../../assets/icons/MessageIcon';

const ReplenishmentDetailsScreen = ({route}: any) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#000' : '#CDCDCD';
  const navigation = useNavigation<any>();

  const item = route?.params?.item

  return (
    <View style={styles.container}>
      <>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackIcon fill={iconFill} />
          </Pressable>

          <Text style={fonts.H3}>25.09.2025, 10:51</Text>

          <View style={{ width: 20, height: 20 }} />
        </View>

        <Text style={[fonts.b2, styles.desc]}>Успешное пополнение</Text>

        <Text style={[fonts.H1, styles.price]}>{item?.amount ? item?.amount + '֏' :  '+2 000 ֏'}</Text>

        <View style={styles.btns}>
          <CircleIconBtn title={'Чек\n списания'} icon={<CheckIcon fill={iconFill} />} />
          <CircleIconBtn title={'Чек\n возврата'} icon={<CheckIcon fill={iconFill} />} />
          <CircleIconBtn
            title={'Отправить чек на почту'}
            icon={<MessageIcon fill={iconFill} />}
          />
        </View>
      </>

      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: theme === 'light' ? '#fff' : '#161616' },
        ]}
      >
        <View>
          <View style={{gap: 8}}>
            <Text style={fonts.H4}>АЗС</Text>
            <Text style={fonts.H5}>
              АЗС 047, г. Ереван, просп. Аршакуняц, 34/16
            </Text>
          </View>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{gap: 8}}>
            <Text style={fonts.H4}>Колонка</Text>
            <Text style={fonts.H5}>
              №2
            </Text>
          </View>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{gap: 8}}>
            <Text style={fonts.H4}>Топливо</Text>
            <Text style={fonts.H5}>
              АИ-95
            </Text>
          </View>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{gap: 8}}>
            <Text style={fonts.H4}>Количество</Text>
            <Text style={fonts.H5}>
              70 л
            </Text>
          </View>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{gap: 8}}>
            <Text style={fonts.H4}>Статус</Text>
            <Text style={fonts.H5}>
              Успешно
            </Text>
          </View>
          <View style={styles.line}/>
        </View>
      </View>
      <HideTabBar />
    </View>
  );
};

export default ReplenishmentDetailsScreen;

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
      marginTop: 42,
      paddingHorizontal: 16,
      marginBottom: 24,
      width: '100%',
    },
    bottomContainer: {
      flex: 1,
      width: '100%',
      marginTop: 24,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      padding: 16,
    },
    desc: {
      color: getColor('grey', 'white'),
    },
    price: {
      color: getColor('green', 'green'),
      marginVertical: 12,
    },
    btns: {
      flexDirection: 'row',
      gap: 55,
      marginTop: 24,
    },
    line:{
      backgroundColor: getColor('grey2', 'grey2'),
      width: '100%',
      height: 1,
      marginVertical: 12
    }
  });
