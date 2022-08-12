import FullLogo from '@assets/images/meetnow-full-logo-with-slogan.png';
import { BUTTON, Button } from '@components/atoms/Button';
import { LinearGradientBackground } from '@components/atoms/LinearGradientBackground';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { spacing } from '@src/theme';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

type TLoginScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<TLoginScreenNavigationProp>();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '346786182080-07vgpfu3rorbiv9rn03l1csm7evvpg8r.apps.googleusercontent.com',
  });

  const signInWithGoogle = () => {
    promptAsync();
  };

  useEffect(() => {
    // TODO: handle session login
    // if (response?.type === 'success') {
    //   const { authentication } = response;
    // }
    // console.log(response);
  }, [response]);

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <Image source={FullLogo} style={styles.image} />
      <View style={styles.buttons}>
        <Button
          style={styles.firstBtn}
          variant="white"
          size="l"
          fullWidth
          onPress={signInWithGoogle}
          icon={<FontAwesome5 name="google" size={BUTTON.fontSize.l} />}>
          Sign in with google
        </Button>
        <Button
          variant="white"
          size="l"
          onPress={() => navigation.navigate('InputPhoneNumber')}
          fullWidth>
          Sign in with phone number
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout,
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: spacing[4],
  },
  image: {
    resizeMode: 'contain',
    height: '70%',
  },
  buttons: {
    alignSelf: 'stretch',
  },
  firstBtn: {
    marginBottom: spacing[18],
  },
});
