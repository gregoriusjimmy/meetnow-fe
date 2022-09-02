import GpsImage from '@assets/images/gps-with-circle.png';
import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { LinearGradientBackground } from '@components/atoms/LinearGradientBackground';
import { permissionLocationAtom } from '@src/rootState';
import { i18n } from '@utils/i18n';
import { spacing } from '@utils/theme';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
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
      <StatusBar backgroundColor="transparent" translucent />
      <Image source={GpsImage} style={styles.image} />
      <View style={styles.content}>
        <CText color="light" variant="h3Bold">
          {i18n.t('enable_location_title')}
        </CText>
        <CText color="light" style={styles.subtitle} variant="subtitle">
          {i18n.t('enable_location_message')}
        </CText>
        <Button variant="neutral" size="l" onPress={handleBtnPress}>
          {i18n.t('enable_location_allow_location')}
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
