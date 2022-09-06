import ImgMarkerBlue from '@assets/images/marker-blue.png';
import ImgMarkerRed from '@assets/images/marker-red.png';
import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { AntDesign } from '@expo/vector-icons';
import { useLocation } from '@hooks/useLocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { verticalScale } from '@utils/scale';
import { colors, spacing } from '@utils/theme';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { useAtomValue } from 'jotai';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { matchedUserAtom } from './atom';

type TNavigateMateScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'NavigateMate'
>;

export const NavigateMateScreen = () => {
  const navigation = useNavigation<TNavigateMateScreenNavigationProp>();
  const matchedUser = useAtomValue(matchedUserAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(true);
  const { coords } = useLocation();
  const mapRef = useRef<MapView>(null);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation]
  );

  useLayoutEffect(() => {
    setIsLoading(true);
    if (!mapRef || !isMapReady || !coords) return;
    setTimeout(() => {
      mapRef.current?.fitToSuppliedMarkers(['user', 'mate'], {
        edgePadding: {
          bottom: spacing[24],
          top: spacing[24],
          left: spacing[24],
          right: spacing[24],
        },
      });
    }, 1000);
    setIsLoading(false);
  }, [coords, isMapReady, isLoading]);

  if (isLoading || !matchedUser || !coords) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          onMapReady={() => setIsMapReady(true)}
          style={styles.map}
          initialRegion={{
            latitude: matchedUser.coordinate.lat,
            longitude: matchedUser.coordinate.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            identifier="mate"
            image={ImgMarkerBlue}
            coordinate={{
              longitude: matchedUser.coordinate.long,
              latitude: matchedUser.coordinate.lat,
            }}
            title={matchedUser.firstName}
          />
          <Marker
            image={ImgMarkerRed}
            identifier="user"
            coordinate={{
              longitude: coords.longitude,
              latitude: coords.latitude,
            }}
            title="You"
          />
        </MapView>
      </View>
      <View style={styles.content}>
        <Button
          fullWidth={false}
          size="m"
          variant="neutral-outline"
          icon={<AntDesign name="instagram" size={24} color={colors.base.gray} />}
          style={styles.instagramBtn}
          onPress={() =>
            Linking.openURL(`https://www.instagram.com/${matchedUser.instagramUsername}/`)
          }>
          {matchedUser.instagramUsername}
        </Button>
        <CText variant="caption" style={styles.caption}>
          As we do not have a chat system yet, please contact them through their Instagram account
          to arrange the meeting.
        </CText>
        <Button variant="primary" onPress={() => navigation.navigate('MateMet')}>{`I MET ${
          matchedUser.gender === 'male' ? 'HIM' : 'HER'
        }`}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.layout, alignItems: 'center' },
  navigationIcon: { marginVertical: verticalScale(spacing[12]) },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(spacing[20]),
    marginBottom: verticalScale(spacing[36]),
  },
  caption: {
    marginBottom: verticalScale(spacing[32]),
  },
  instagramBtn: {
    flexDirection: 'row',
    marginVertical: verticalScale(spacing[12]),
  },
  mapContainer: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: '100%' },
});
