import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const deviceName = DeviceInfo.getDeviceNameSync()

export const appConfig = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isEmulator: DeviceInfo.isEmulatorSync(),
  isDebug: __DEV__,
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  model: DeviceInfo.getModel(),
  deviceId: (async () => await DeviceInfo.getUniqueId())(),
};
