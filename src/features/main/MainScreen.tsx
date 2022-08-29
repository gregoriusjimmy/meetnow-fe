import ImgWomanAndMan from '@assets/images/woman-man-2.png';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { LoadingScreen } from '@src/components/screens/LoadingScreen';
import { colors, spacing } from '@src/theme';
import { scale, verticalScale } from '@src/utils/scale';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CriteriaButton, MainLocation } from './UIMain';

type TMainScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Main'>;

export function MainScreen() {
  const [currentStreet, setCurrentStreet] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<TMainScreenNavigationProp>();

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        setIsLoading(true);
        const { coords } = await Location.getCurrentPositionAsync();
        const address = await Location.reverseGeocodeAsync(coords);
        const { street, district, city, subregion, region } = address[0];
        setCurrentStreet(street ?? district ?? city ?? subregion ?? region ?? 'Undefined');
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentLocation();
  }, []);

  const handlePressSearch = () => {
    navigation.navigate('SearchMate');
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <MainLocation style={styles.location} currentStreet={currentStreet} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={ImgWomanAndMan} style={styles.image} />
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <CText variant="h4Medium" style={styles.cardTitle}>
              Meet-mate
            </CText>
            <View style={styles.criteriaContainer}>
              <CriteriaButton title="Age" specified="18-45" />
              <CriteriaButton title="Gender" specified="Both" />
              <CriteriaButton title="Distance" specified="0-20km" />
            </View>
            <Button style={styles.ctaBtn} onPress={handlePressSearch} variant="primary">
              SEARCH MEET-MATE
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.brand.primary },
  location: {
    marginTop: verticalScale(spacing[12]),
    paddingHorizontal: spacing.layout,
  },
  content: { flex: 1, marginTop: verticalScale(spacing[48]), alignItems: 'center' },
  image: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  imageContainer: { flex: 0.5, width: '100%' },
  card: {
    backgroundColor: colors.base.white,
    width: '100%',
    flex: 0.5,
    paddingTop: verticalScale(spacing[40]),
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    borderTopLeftRadius: scale(spacing[28]),
    borderTopRightRadius: scale(spacing[28]),
  },
  cardContent: {
    paddingHorizontal: spacing.layout,
  },
  cardTitle: {
    marginBottom: verticalScale(spacing[8]),
  },
  ctaBtn: {
    marginTop: verticalScale(spacing[40]),
  },
  criteriaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
