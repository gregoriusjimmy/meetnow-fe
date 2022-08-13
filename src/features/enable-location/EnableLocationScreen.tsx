import GpsImage from '@assets/images/gps-with-circle.png';
import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { LinearGradientBackground } from '@components/atoms/LinearGradientBackground';
import { permissionLocationAtom } from '@src/rootState';
import { spacing } from '@src/theme';
import * as Location from 'expo-location';
import { useSetAtom } from 'jotai';
import { Image, StyleSheet, View } from 'react-native';

export function EnableLocationScreen() {
  const setPermissionLocation = useSetAtom(permissionLocationAtom);

  const handleBtnPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === Location.PermissionStatus.GRANTED) {
      setPermissionLocation(Location.PermissionStatus.GRANTED);
    }
    // TODO: handle double reject canAskAgain = false
  };

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <Image source={GpsImage} style={styles.image} />
      <View style={styles.content}>
        <CText color="light" variant="h3Bold">
          Enable Location
        </CText>
        <CText color="light" style={styles.subtitle} variant="subtitle">
          You’ll need to enable location in order to use Meetnow
        </CText>
        <Button variant="white" size="l" onPress={handleBtnPress}>
          ALLOW LOCATION
        </Button>
        {/* TODO: add learn more button to show modal */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout,
    paddingBottom: spacing[40],
    alignItems: 'center',
  },
  content: { alignSelf: 'stretch', alignItems: 'center' },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing[8],
    marginBottom: spacing[24],
  },
  image: {
    resizeMode: 'contain',
    width: '50%',
    height: '70%',
  },
});
