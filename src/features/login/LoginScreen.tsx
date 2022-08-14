import FullLogo from '@assets/images/meetnow-full-logo-with-slogan.png';
import { BUTTON, Button } from '@components/atoms/Button';
import { LinearGradientBackground } from '@components/atoms/LinearGradientBackground';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@src/hooks/useAuth';
import { spacing } from '@src/theme';
import { Image, StyleSheet, View } from 'react-native';

export function LoginScreen() {
  const { signInWithGoogle, request } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <Image source={FullLogo} style={styles.image} />
      <View style={styles.buttons}>
        <Button
          disabled={!request}
          style={styles.firstBtn}
          variant="white"
          size="l"
          onPress={signInWithGoogle}
          icon={<FontAwesome5 name="google" size={BUTTON.fontSize.l} />}>
          Sign in with google
        </Button>
        {/* <Button variant="white" size="l" onPress={() => navigation.navigate('InputPhoneNumber')}>
          Sign in with phone number
        </Button> */}
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
    height: '80%',
    // TODO: change height back to 70% if sign in with number implemented
  },
  buttons: {
    alignSelf: 'stretch',
  },
  firstBtn: {
    marginBottom: spacing[18],
  },
});
