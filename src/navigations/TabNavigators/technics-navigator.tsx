import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TechnicsMainScreen from '../../screens/AuthedScreens/TechnicsScreens/technics-main-screen.tsx';
import CreateTechnicScreen from '../../screens/AuthedScreens/TechnicsScreens/create-technic-screen.tsx';
import CreateDriverScreen from '../../screens/AuthedScreens/TechnicsScreens/create-driver-screen.tsx';
import VehicleDetailScreen from '../../screens/AuthedScreens/TechnicsScreens/vehicle-detail-screen.tsx';
import DriverDetailScreen from '../../screens/AuthedScreens/TechnicsScreens/driver-detail-screen.tsx';

let Stack = createStackNavigator();

export default function TechnicsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TechnicsMainScreen"
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
      <Stack.Screen name="TechnicsMainScreen" component={TechnicsMainScreen} />
      <Stack.Screen name="CreateTechnicScreen" component={CreateTechnicScreen} />
      <Stack.Screen name="CreateDriverScreen" component={CreateDriverScreen} />
      <Stack.Screen name="VehicleDetailScreen" component={VehicleDetailScreen} />
      <Stack.Screen name="DriverDetailScreen" component={DriverDetailScreen} />
    </Stack.Navigator>
  );
}

