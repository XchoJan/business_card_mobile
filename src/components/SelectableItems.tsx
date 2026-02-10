import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RightArrow from '../assets/icons/RightArrow';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';

interface SelectableItemProps {
  icon?: any;
  text: string;
  onPress?: () => void;
}

const SelectableItems = ({ icon, text, onPress }: SelectableItemProps) => {
  const { styles, theme, fonts } = useStyles(createStyles);
  let iconFill = theme === 'light' ? '#777777' : '#CDCDCD';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.container}
    >
      <View style={styles.row}>
        {icon && <View>{icon}</View>}
        <Text style={fonts.b2}>{text}</Text>
      </View>

      <View>
        <RightArrow fill={iconFill} />
      </View>
    </TouchableOpacity>
  );
};

export default SelectableItems;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
