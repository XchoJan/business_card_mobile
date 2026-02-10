import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapMainScreen from '../../screens/AuthedScreens/MainScreens/map-main-screen.tsx';
import RefuelScreen from '../../screens/AuthedScreens/MainScreens/refuel-screen.tsx';
import SelectFuelScreen from '../../screens/AuthedScreens/MainScreens/select-fuel-screen.tsx';
import SelectLiterScreen from '../../screens/AuthedScreens/MainScreens/select-liter-screen.tsx';
import ConfirmRefuelingScreen from '../../screens/AuthedScreens/MainScreens/confirm-refueling-screen.tsx';
import SuccessPayedScreen from '../../screens/AuthedScreens/MainScreens/success-payed-screen.tsx';
import SuccessComplateScreen from '../../screens/AuthedScreens/MainScreens/success-complate-screen.tsx';
import PistolScreen from '../../screens/AuthedScreens/MainScreens/pistol-screen.tsx';

let Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MapMainScreen"
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
      <Stack.Screen name="MapMainScreen" component={MapMainScreen} />
      <Stack.Screen name="RefuelScreen" component={RefuelScreen} />
      <Stack.Screen name="SelectFuelScreen" component={SelectFuelScreen} />
      <Stack.Screen name="SelectLiterScreen" component={SelectLiterScreen} />
      <Stack.Screen name="ConfirmRefuelingScreen" component={ConfirmRefuelingScreen} />
      <Stack.Screen name="SuccessPayedScreen" component={SuccessPayedScreen} />
      <Stack.Screen name="PistolScreen" component={PistolScreen} />
      <Stack.Screen name="SuccessComplateScreen" component={SuccessComplateScreen} />
    </Stack.Navigator>
  );
}
