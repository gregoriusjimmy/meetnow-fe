import ImgBirdLoading from '@assets/images/bird.png';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { CText } from '@src/components/atoms/CText';
import { userAtom } from '@src/rootState';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

type TSearchMateScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'SearchMate'>;

export const SearchMateScreen = () => {
  const navigation = useNavigation<TSearchMateScreenNavigationProp>();
  const scale = useSharedValue(1);
  const [user, setUser] = useAtom(userAtom);

  const duckAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    scale.value = withRepeat(withSpring(0.9, { damping: 10, mass: 50 }), -1, true);
    setUser({ ...user!, matched: true });
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();

        Alert.alert(
          'Cancel searching your meet-mate?',
          'Are you sure to cancel it and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Animated.Image source={ImgBirdLoading} style={duckAnimationStyle} />
      <CText variant="subtitle">Searching your meet-mate... </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
