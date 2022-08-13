import { LoginScreen } from '@src/features/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PermissionStatus } from 'expo-location';
import { useAtomValue } from 'jotai';

import { EnableLocationScreen } from './features/enable-location/EnableLocationScreen';
import { permissionLocationAtom } from './rootState';
import { InputPhoneNumberScreen } from './features/signup/InputPhoneNumberScreen';
import { CText } from './components/atoms/CText';

export type TRootStackParamList = {
  Login: undefined;
  EnableLocation: undefined;
  InputPhoneNumber: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppNavigator = () => {
  const permissionLocation = useAtomValue(permissionLocationAtom);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ statusBarTranslucent: true }}>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          {permissionLocation !== PermissionStatus.GRANTED && (
            <Stack.Screen name="EnableLocation" component={EnableLocationScreen} />
          )}
          {permissionLocation === PermissionStatus.GRANTED && (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerTransparent: true,
            headerTitle: '',
          }}>
          <Stack.Screen name="InputPhoneNumber" component={InputPhoneNumberScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
