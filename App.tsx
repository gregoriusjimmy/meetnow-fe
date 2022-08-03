import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { AppNavigator } from "./src/AppNavigator";
import * as SplashScreen from "expo-splash-screen";

import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };
    fontsLoaded && hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
