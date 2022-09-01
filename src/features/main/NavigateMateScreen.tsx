import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { scale, verticalScale } from '@src/utils/scale';
import { colors, spacing } from '@src/utils/theme';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TNavigateMateScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'NavigateMate'
>;

export const NavigateMateScreen = () => {
  const navigation = useNavigation<TNavigateMateScreenNavigationProp>();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.content}>
        <CText variant="h2Medium">Vika</CText>
        <FontAwesome
          name="location-arrow"
          size={scale(100)}
          color={colors.brand.primary}
          style={styles.navigationIcon}
        />
        <CText variant="h1">1km</CText>
        <View style={styles.chatSection}>
          <Button
            fullWidth={false}
            size="m"
            variant="neutral-outline"
            icon={<AntDesign name="instagram" size={24} color={colors.base.gray} />}
            style={styles.instagramBtn}
            onPress={() => Linking.openURL('https://www.instagram.com/gregoriusjimmy/')}>
            gregoriusjimmy
          </Button>
          <CText variant="caption">
            As we do not have a chat system, please contact them through their Instagram account to
            arrange the meeting.
          </CText>
        </View>
      </View>
      <Button variant="primary">I FOUND HIM</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.layout },
  content: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(spacing[12]),
  },
  navigationIcon: { marginVertical: verticalScale(spacing[12]) },
  chatSection: {
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
    marginTop: verticalScale(spacing[20]),
  },
  instagramBtn: { flexDirection: 'row', marginBottom: spacing[12] },
});
