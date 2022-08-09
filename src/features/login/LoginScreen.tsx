import FullLogo from '@assets/images/meetnow-full-logo-with-slogan.png';
import { BUTTON, Button } from '@components/atoms/Button';
import { LinearGradientBackground } from '@components/atoms/LinearGradientBackground';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { permissionLocationAtom } from '@src/rootState';
import { spacing } from '@src/theme';
import { useAtom, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

type TLoginScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Login'>;

export function LoginScreen() {
  const setPermissionLocation = useSetAtom(permissionLocationAtom);

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
          icon={<FontAwesome5 name="google" size={BUTTON.fontSize.l} />}>
          Sign in with google
        </Button>
        <Button
          variant="white"
          size="l"
          fullWidth
          onPress={() => {
            setPermissionLocation('denied');
          }}>
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
