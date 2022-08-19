import FullLogo from '@assets/images/meetnow-full-logo-with-slogan.png';
import { BUTTON, Button } from '@components/atoms/Button';
import { LinearGradientBackground } from '@components/atoms/LinearGradientBackground';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { useAuth } from '@src/hooks/useAuth';
import { spacing } from '@src/theme';
import { Image, StyleSheet, View } from 'react-native';

type TLoginScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<TLoginScreenNavigationProp>();
  const { signInWithGoogle, request } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <Image source={FullLogo} style={styles.image} />
      <View style={styles.buttons}>
        <Button
          disabled={!request}
          style={styles.firstBtn}
          variant="neutral"
          size="l"
          onPress={signInWithGoogle}
          icon={<FontAwesome5 name="google" size={BUTTON.fontSize.l} />}>
          Sign in with google
        </Button>
        <Button variant="neutral" size="l" onPress={() => navigation.navigate('InputPhoneNumber')}>
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
  image: {
    resizeMode: 'contain',
    height: '70%',
  },
  buttons: {
    alignSelf: 'stretch',
  },
  firstBtn: {
    marginBottom: spacing[16],
  },
});
