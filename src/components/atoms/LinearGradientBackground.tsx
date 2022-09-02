import { colors } from '@utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export function LinearGradientBackground() {
  return (
    <LinearGradient
      locations={[0.15, 0.83]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.brand.primaryLight, colors.brand.primaryDark]}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
