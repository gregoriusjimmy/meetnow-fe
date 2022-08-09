import { LoginScreen } from '@features/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PermissionStatus } from 'expo-location';
import { useAtomValue } from 'jotai';

import { EnableLocationScreen } from './features/enable-location/EnableLocationScreen';
import { permissionLocationAtom } from './rootState';

export type TRootStackParamList = {
  Login: undefined;
  EnableLocation: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppNavigator = () => {
  const permissionLocation = useAtomValue(permissionLocationAtom);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {permissionLocation !== PermissionStatus.GRANTED && (
          <Stack.Screen name="EnableLocation" component={EnableLocationScreen} />
        )}
        {permissionLocation === PermissionStatus.GRANTED && (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
