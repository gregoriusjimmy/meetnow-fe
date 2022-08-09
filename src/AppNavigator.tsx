import { LoginScreen } from '@features/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EnableLocationScreen } from './features/enable-location/EnableLocationScreen';

export type TRootStackParamList = {
  Login: undefined;
  EnableLocation: undefined;
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="EnableLocation" component={EnableLocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
