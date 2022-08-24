import ImgWomanAndMan from '@assets/images/woman-man-2.png';
import { Button } from '@src/components/atoms/Button';
import { CTEXT, CText } from '@src/components/atoms/CText';
import { IconLocation } from '@src/components/icons/Location';
import { LoadingScreen } from '@src/components/screens/LoadingScreen';
import { colors, spacing } from '@src/theme';
import { scale, verticalScale } from '@src/utils/scale';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function MainScreen() {
  const [currentStreet, setCurrentStreet] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.brand.primary }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: verticalScale(spacing[12]),
          paddingHorizontal: spacing.layout,
        }}>
        <IconLocation
          style={{ marginBottom: spacing[4] }}
          fill={colors.base.white}
          width={CTEXT.fontSize.h2}
          height={CTEXT.fontSize.h2}
        />
        <CText
          variant="h3Medium"
          style={{ marginLeft: spacing[12] }}
          color="light"
          numberOfLines={1}>
          {currentStreet}
        </CText>
      </View>
      <View style={{ flex: 1, marginTop: verticalScale(spacing[48]), alignItems: 'center' }}>
        <View style={{ flex: 0.5, width: '100%' }}>
          <Image
            source={ImgWomanAndMan}
            style={{
              resizeMode: 'contain',
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View
          style={{
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
          }}>
          <View
            style={{
              paddingHorizontal: spacing.layout,
            }}>
            <CText variant="h4Medium" style={{ marginBottom: verticalScale(spacing[8]) }}>
              Meet-mate
            </CText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  width: '30%',
                  alignItems: 'center',
                  padding: spacing[12],
                  borderWidth: 1,
                  borderColor: colors.brand.primary,
                  borderRadius: scale(spacing[24]),
                }}>
                <CText variant="p">Age</CText>
                <CText variant="subtitleMedium">18-45</CText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '30%',
                  alignItems: 'center',
                  padding: spacing[12],
                  borderWidth: 1,
                  borderColor: colors.brand.primary,
                  borderRadius: scale(spacing[24]),
                }}>
                <CText variant="p">Gender</CText>
                <CText variant="subtitleMedium">Both</CText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '30%',
                  alignItems: 'center',
                  padding: spacing[12],
                  borderWidth: 1,
                  borderColor: colors.brand.primary,
                  borderRadius: scale(spacing[24]),
                }}>
                <CText variant="p">Distance</CText>
                <CText variant="subtitleMedium">0-20km</CText>
              </TouchableOpacity>
            </View>
            <Button
              style={{
                marginTop: verticalScale(spacing[40]),
              }}
              variant="primary">
              SEARCH MEET-MATE
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
