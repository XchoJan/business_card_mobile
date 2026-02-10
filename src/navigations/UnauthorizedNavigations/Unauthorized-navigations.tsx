import {createStackNavigator} from '@react-navigation/stack';

let Stack = createStackNavigator();

import AuthScreen from "../../screens/UnauthedScreens/AuthorizationScreen/auth-screen.tsx";
import RegistrationScreen from "../../screens/UnauthedScreens/RegistrationScreen/registration-screen.tsx";
import PinCodeScreen from '../../screens/UnauthedScreens/PinCodeScreen/pin-code-screen.tsx';
import CreatePassScreen from '../../screens/UnauthedScreens/CreatePassScreen/create-pass-screen.tsx';
import ResetPassScreen from '../../screens/UnauthedScreens/ResetPassScreen/reset-pass-screen.tsx';

const UnauthorizedNavigations = () => {
    return (
        <Stack.Navigator
            initialRouteName={'AuthScreen'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="PinCodeScreen" component={PinCodeScreen} />
            <Stack.Screen name="CreatePassScreen" component={CreatePassScreen} />
            <Stack.Screen name="ResetPassScreen" component={ResetPassScreen} />
        </Stack.Navigator>
    );
};

export default UnauthorizedNavigations;
