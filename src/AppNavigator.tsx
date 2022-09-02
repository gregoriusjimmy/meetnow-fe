import { LoginScreen } from '@features/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PermissionStatus } from 'expo-location';
import { useAtomValue } from 'jotai';

import { LoadingScreen } from './components/screens/LoadingScreen';
import { EnableLocationScreen } from './features/enable-location/EnableLocationScreen';
import { MainScreen } from './features/main/MainScreen';
import { MatchedScreen } from './features/main/MatchedScreen';
import { NavigateMateScreen } from './features/main/NavigateMateScreen';
import { SearchMateScreen } from './features/main/SearchMateScreen';
import { InputBirthDateScreen } from './features/sign-up/InputBirthDateScreen';
import { InputGenderScreen } from './features/sign-up/InputGenderScreen';
import { InputInstagramUsernameScreen } from './features/sign-up/InputInstagranUsername';
import { InputInterestsScreen } from './features/sign-up/InputInterestScreen';
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
  InputBirthDate: undefined;
  InputGender: undefined;
  InputInstagramUsername: undefined;
  InputInterests: undefined;
  UploadProfilePicture: undefined;
  Main: undefined;
  SearchMate: undefined;
  Matched: undefined;
  NavigateMate: undefined;
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
          {permissionLocation === PermissionStatus.GRANTED && user && !user.matched && (
            <>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="SearchMate" component={SearchMateScreen} />
            </>
          )}
          {permissionLocation === PermissionStatus.GRANTED && user && user.matched && (
            <>
              <Stack.Screen name="Matched" component={MatchedScreen} />
              <Stack.Screen name="NavigateMate" component={NavigateMateScreen} />
            </>
          )}
        </Stack.Group>
        {!user && (
          // SIGN UP STACK
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
            <Stack.Screen name="InputBirthDate" component={InputBirthDateScreen} />
            <Stack.Screen name="InputGender" component={InputGenderScreen} />
            <Stack.Screen name="InputInstagramUsername" component={InputInstagramUsernameScreen} />
            <Stack.Screen name="InputInterests" component={InputInterestsScreen} />
            <Stack.Screen name="UploadProfilePicture" component={UploadProfilePictureScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
