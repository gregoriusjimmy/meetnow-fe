import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GpsImage from "@assets/images/gps-with-circle.png";
import { colors, spacing } from "@src/theme";
import { CText } from "@components/atoms/CText";
import { Button } from "@components/atoms/Button";

export function EnableLocationScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.15, 0.83]}
        colors={[colors.brand.primaryLight, colors.brand.primaryDark]}
        style={styles.background}
      />
      <View style={styles.content}>
        <Image source={GpsImage} style={styles.image} />
        <CText color='light' variant='h3Bold'>
          Enable Location
        </CText>
        <CText color='light' style={styles.subtitle} variant='subtitle'>
          You’ll need to enable location in order to use Meetnow
        </CText>
      </View>
      <Button variant='white' size='l' fullWidth>
        ALLOW LOCATION
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: spacing[24],
    alignItems: "center",
    paddingBottom: spacing[40],
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: { width: "100%", alignItems: "center" },
  subtitle: {
    textAlign: "center",
    marginTop: spacing[8],
  },
  image: {
    resizeMode: "contain",
    width: "50%",
    height: "50%",
    marginBottom: spacing[24],
  },
});
