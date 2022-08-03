import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GpsImage from "@assets/gps-with-circle.png";
import CText from "@components/atoms/CText";
import { colors, spacing } from "@src/theme";

export function EnableLocationScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.15, 0.83]}
        colors={[colors.brand.primaryLight, colors.brand.primaryDark]}
        style={styles.background}
      />
      <Image source={GpsImage} style={styles.image} />
      <CText style={styles.title} variant='h3Bold'>
        Enable Location
      </CText>
      <CText style={styles.subtitle} variant='subtitle'>
        You’ll need to enable location in order to use Meetnow
      </CText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.l,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: { color: colors.base.white },
  subtitle: { color: colors.base.white, textAlign: "center" },
  image: { resizeMode: "contain", width: "30%", height: "30%" },
});
