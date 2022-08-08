import { useEffect } from "react";
import { AppNavigator } from "./AppNavigator";
import * as SplashScreen from "expo-splash-screen";

import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { registerRootComponent } from "expo";

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Semibold": require("../assets/fonts/Poppins-Semibold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
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

export default registerRootComponent(App);
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
