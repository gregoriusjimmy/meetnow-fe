import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as Localization from 'expo-localization';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './AppNavigator';
import { useAuth } from './hooks/useAuth';
import { permissionLocationAtom } from './rootState';
import { i18n } from './utils/i18n';
import './configs/axiosConfig';

i18n.locale = Localization.locale;
i18n.enableFallback = true;

SplashScreen.preventAutoHideAsync();

function App() {
  const setPermissionLocation = useSetAtom(permissionLocationAtom);
  const { authStateChangedListener } = useAuth();

  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Semibold': require('../assets/fonts/Poppins-Semibold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => authStateChangedListener(), []);
  useEffect(() => {
    async function prepare() {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        setPermissionLocation(status);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    if (!fontsLoaded) return;
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </View>
  );
}

export default registerRootComponent(App);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
