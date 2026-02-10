import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles.ts';

interface AppContainerProps {
  children: ReactNode;
  paddingTop?: number;
  ignorePadding?: boolean
}

const AppContainer: React.FC<AppContainerProps> = ({ children, paddingTop, ignorePadding }) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={[styles.container, { paddingTop }, ignorePadding && {paddingHorizontal: 0}]}>
      {children}
    </View>
  );
};

export default AppContainer;

const createStyles = (getColor: (light: ColorsEnum, dark: ColorsEnum) => string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('bg', 'bg'),
      alignItems: 'center',
    },
  });
