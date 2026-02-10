import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WalletMainScreen from '../../screens/AuthedScreens/WalletScreens/wallet-main-screen.tsx';
import OperationsScreen from '../../screens/AuthedScreens/WalletScreens/operations-screen.tsx';
import ReplenishScreen from '../../screens/AuthedScreens/WalletScreens/replenish-screen.tsx';
import ReplenishmentDetailsScreen from '../../screens/AuthedScreens/WalletScreens/replenishment-details-screen.tsx';
let Stack = createStackNavigator();

export default function WalletNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="WalletMainScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'fade_from_bottom',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 100,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 100,
            },
          },
        },
      }}
    >
      <Stack.Screen name="WalletMainScreen" component={WalletMainScreen} />
      <Stack.Screen name="OperationsScreen" component={OperationsScreen} />
      <Stack.Screen name="ReplenishScreen" component={ReplenishScreen} />
      <Stack.Screen name="ReplenishmentDetailsScreen" component={ReplenishmentDetailsScreen} />
    </Stack.Navigator>
  );
}
