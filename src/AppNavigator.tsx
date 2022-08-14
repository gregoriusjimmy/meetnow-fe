import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@src/features/login/LoginScreen';
import { PermissionStatus } from 'expo-location';
import { useAtomValue } from 'jotai';

import { LoadingScreen } from './components/screens/LoadingScreen';
import { EnableLocationScreen } from './features/enable-location/EnableLocationScreen';
import { InputPhoneNumberScreen } from './features/signup/InputPhoneNumberScreen';
import { isLoadingAuthAtom, permissionLocationAtom, userAtom } from './rootState';

export type TRootStackParamList = {
  Login: undefined;
  EnableLocation: undefined;
  InputPhoneNumber: undefined;
  Loading: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppNavigator = () => {
  const permissionLocation = useAtomValue(permissionLocationAtom);
  const user = useAtomValue(userAtom);
  const isLoadingAuth = useAtomValue(isLoadingAuthAtom);

  if (isLoadingAuth) return <LoadingScreen />;

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
          {permissionLocation === PermissionStatus.GRANTED && !user && (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Group>
        {user && (
          <Stack.Group
            screenOptions={{
              headerTransparent: true,
              headerTitle: '',
            }}>
            <Stack.Screen name="InputPhoneNumber" component={InputPhoneNumberScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
