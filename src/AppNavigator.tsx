import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@src/features/login/LoginScreen';
import { PermissionStatus } from 'expo-location';
import { useAtomValue } from 'jotai';

import { LoadingScreen } from './components/screens/LoadingScreen';
import { EnableLocationScreen } from './features/enable-location/EnableLocationScreen';
import { InputBirthdayScreen } from './features/sign-up/InputBirthdayScreen';
import { InputGenderScreen } from './features/sign-up/InputGenderScreen';
import { InputNameScreen } from './features/sign-up/InputNameScreen';
import { InputNicknameScreen } from './features/sign-up/InputNicknameScreen';
import { InputOTPScreen } from './features/sign-up/InputOTPScreen';
import { InputPhoneNumberScreen } from './features/sign-up/InputPhoneNumberScreen';
import { UploadProfilePictureScreen } from './features/sign-up/UploadProfilePictureScreen';
import { isLoadingAuthAtom, permissionLocationAtom, userAtom } from './rootState';

export type TRootStackParamList = {
  Login: undefined;
  EnableLocation: undefined;
  Loading: undefined;
  InputPhoneNumber: undefined;
  InputOTP: undefined;
  InputName: undefined;
  InputNickname: undefined;
  InputBirthday: undefined;
  InputGender: undefined;
  UploadProfilePicture: undefined;
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
        <Stack.Group
          screenOptions={{
            headerTransparent: true,
            headerTitle: '',
          }}>
          {/* TODO: handle cannot go back to input phone number if otp already verified */}
          <Stack.Screen name="InputPhoneNumber" component={InputPhoneNumberScreen} />
          <Stack.Screen name="InputOTP" component={InputOTPScreen} />
          <Stack.Screen name="InputName" component={InputNameScreen} />
          <Stack.Screen name="InputNickname" component={InputNicknameScreen} />
          <Stack.Screen name="InputBirthday" component={InputBirthdayScreen} />
          <Stack.Screen name="InputGender" component={InputGenderScreen} />
          <Stack.Screen name="UploadProfilePicture" component={UploadProfilePictureScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
