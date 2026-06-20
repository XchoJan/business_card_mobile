import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigations from './src/navigations';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store.ts';
import CustomToast from './src/components/CustomToast.tsx';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />
      <SafeAreaProvider style={{ flex: 1 }}>
          <Provider store={store}>
            <View style={{zIndex: 99999}}>
              <CustomToast/>
            </View>
            <RootNavigations />
          </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
