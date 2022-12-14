import ImgBirdLoading from '@assets/images/bird.png';
import { CText } from '@components/atoms/CText';
import { useLocation } from '@hooks/useLocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { userAtom } from '@src/rootState';
import { StatusBar } from 'expo-status-bar';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

import { usePostSearchNearbyUser } from './APISearchNearbyUser';
import { matchedUserAtom } from './atom';
type TSearchMateScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'SearchMate'>;

export const SearchMateScreen = () => {
  const navigation = useNavigation<TSearchMateScreenNavigationProp>();
  const scale = useSharedValue(1);
  const setMatchedUser = useSetAtom(matchedUserAtom);
  const [user, setUser] = useAtom(userAtom);
  const postSearchNearbyUser = usePostSearchNearbyUser();

  const { coords } = useLocation();

  const duckAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    scale.value = withRepeat(withSpring(0.9, { damping: 10, mass: 50 }), -1, true);
  }, []);

  useEffect(() => {
    const fetchSearchNearbyUser = async () => {
      if (!coords || !user) return;
      try {
        const res = await postSearchNearbyUser(
          {
            userId: user.userId,
            coordinate: { lat: coords.latitude, long: coords.longitude },
          },
          {
            timeout: 30000,
          }
        );
        if (res.matchedUser) {
          setUser({ ...user, matched: true });
          // TODO: re check API distance n coordinate to be number by default
          setMatchedUser({
            ...res.matchedUser,
            distance: Number(res.matchedUser.distance),
            coordinate: {
              lat: Number(res.matchedUser.coordinate.lat),
              long: Number(res.matchedUser.coordinate.long),
            },
          });
          return;
        }
      } catch (error) {
        console.warn(error);
      }
    };
    fetchSearchNearbyUser();
  }, [coords]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert(
          'Cancel searching your meet-mate?',
          'Are you sure to cancel it and leave the screen?',
          [
            {
              text: "Don't leave",
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
      }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" style="dark" />
      <Animated.Image source={ImgBirdLoading} style={duckAnimationStyle} />
      <CText variant="subtitle">Searching your meet-mate... </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
