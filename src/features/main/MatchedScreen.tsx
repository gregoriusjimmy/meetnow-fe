import ImgMaleArrived from '@assets/images/male-arrived.png';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CTEXT, CText } from '@src/components/atoms/CText';
import { verticalScale } from '@src/utils/scale';
import { colors, spacing } from '@src/utils/theme';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InterestBadge } from './UIMain';

type TMatchedScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Matched'>;

export const MatchedScreen = () => {
  const navigation = useNavigation<TMatchedScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <CText variant="h3" style={styles.introText}>
        Yeay, we found your meet-mate!
      </CText>
      <View style={styles.content}>
        <Image source={ImgMaleArrived} style={styles.image} />
        <View style={styles.bio}>
          <View style={styles.bioLeft}>
            <CText variant="h3Medium">Vika</CText>
            <Ionicons name="female" size={CTEXT.fontSize.h3} color={colors.brand.secondary} />
            <CText style={styles.distanceText} variant="caption" color={'gray'}>
              1km
            </CText>
          </View>
          <CText variant="h3Medium">24</CText>
        </View>
        <CText variant="h4">Interest</CText>
        <View style={styles.interests}>
          {Array(6)
            .fill(0)
            .map(() => (
              <InterestBadge />
            ))}
        </View>
      </View>
      <View style={styles.ctaSection}>
        <Button
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('NavigateMate')}
          variant="primary">
          Meet him now
        </Button>
        <Button variant="primary-text">Nope</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout,
  },
  introText: { marginTop: verticalScale(spacing[12]) },
  content: { flex: 1, justifyContent: 'center' },
  image: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    flex: 0.5,
    marginBottom: spacing[8],
  },
  interests: { flexDirection: 'row', flexWrap: 'wrap' },
  bio: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  bioLeft: { flexDirection: 'row', alignItems: 'baseline' },
  distanceText: { marginLeft: spacing[4] },
  ctaSection: {
    width: '100%',
    flex: 0.2,
    justifyContent: 'flex-end',
    marginBottom: verticalScale(spacing[12]),
  },
  primaryBtn: {
    marginBottom: spacing[8],
  },
});
