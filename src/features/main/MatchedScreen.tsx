import ImgFemaleArrived from '@assets/images/female-arrived.png';
import ImgMaleArrived from '@assets/images/male-arrived.png';
import { Button } from '@components/atoms/Button';
import { CTEXT, CText } from '@components/atoms/CText';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { scale, verticalScale } from '@utils/scale';
import { colors, spacing } from '@utils/theme';
import { StatusBar } from 'expo-status-bar';
import { useAtomValue } from 'jotai';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InterestBadge } from './UIMain';
import { matchedUserAtom } from './atom';

type TMatchedScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Matched'>;

export const MatchedScreen = () => {
  const navigation = useNavigation<TMatchedScreenNavigationProp>();
  const matchedUser = useAtomValue(matchedUserAtom);
  if (!matchedUser) return;

  const renderGenderImg = () => {
    if (matchedUser.gender === 'male')
      return <Image source={ImgMaleArrived} style={styles.image} />;
    return <Image source={ImgFemaleArrived} style={styles.image} />;
  };
  const renderGenderIcon = () => {
    if (matchedUser.gender === 'male')
      return <Ionicons name="male" size={CTEXT.fontSize.h3} color={colors.brand.primary} />;
    return <Ionicons name="female" size={CTEXT.fontSize.h3} color={colors.brand.secondary} />;
  };

  const handleDeclineMeet = () => {
    // setUser({ ...user, matched: false });
    Alert.alert('Unable to decline for now');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <CText variant="h3" style={styles.introText}>
        Yeay, we found your meet-mate!
      </CText>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>{renderGenderImg()}</View>
          <View style={styles.bio}>
            <View style={styles.bioLeft}>
              <CText variant="h3Medium" style={styles.nicknameText}>
                {matchedUser?.nickname}
              </CText>
              {renderGenderIcon()}
              <CText style={styles.distanceText} variant="caption" color={'gray'}>
                1km
              </CText>
            </View>
            <CText variant="h3Medium">{matchedUser.age.toString()}</CText>
          </View>
          <CText variant="h4">Interest</CText>
          <View style={styles.interests}>
            {matchedUser.interests.map((interest, idx) => (
              <InterestBadge key={idx} interest={interest} />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.ctaSection}>
        <Button
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('NavigateMate')}
          variant="primary">
          MEET NOW
        </Button>
        <Button variant="primary-text" onPress={handleDeclineMeet}>
          Nope
        </Button>
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
  content: {
    flex: 0.8,
    justifyContent: 'center',
  },
  card: {
    flex: 0.9,
    padding: spacing.layout,
    justifyContent: 'center',
    borderRadius: scale(spacing[20]),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageContainer: { justifyContent: 'center', flex: 1 },
  image: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    marginVertical: spacing[8],
  },
  interests: { flexDirection: 'row', flexWrap: 'wrap' },
  bio: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  bioLeft: { flexDirection: 'row', alignItems: 'baseline' },
  nicknameText: { marginRight: spacing[4] },
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
