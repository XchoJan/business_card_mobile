import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileMainScreen from '../../screens/AuthedScreens/ProfileScreens/profile-main-screen.tsx';
import EditProfileScreen from '../../screens/AuthedScreens/ProfileScreens/edit-profile-screen.tsx';
import AppInfoScreen from '../../screens/AuthedScreens/ProfileScreens/app-info-screen.tsx';
let Stack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="ProfileMainScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'none',
            }}
        >
            <Stack.Screen name="ProfileMainScreen" component={ProfileMainScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="AppInfoScreen" component={AppInfoScreen} />
        </Stack.Navigator>
    );
}
