import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { userAtom } from '@src/rootState';
import { verticalScale } from '@utils/scale';
import { spacing } from '@utils/theme';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { matchedUserAtom } from './atom';
type TMateMetScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'MateMet'>;

export const MateMetScreen = () => {
  const navigation = useNavigation<TMateMetScreenNavigationProp>();
  const [photo, setPhoto] = useState('');
  const [statusCamera, requestPermissionCamera] = ImagePicker.useCameraPermissions();
  const [matchedUser, setMatchedUser] = useAtom(matchedUserAtom);
  const [user, setUser] = useAtom(userAtom);

  if (!matchedUser) return <LoadingScreen />;

  const handleOpenCamera = async () => {
    if (!statusCamera?.granted) await requestPermissionCamera();
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };
  const renderProfilePicture = () => {
    return photo ? (
      <Image
        source={{ uri: photo }}
        style={{
          marginTop: verticalScale(spacing[20]),
          width: '100%',
          height: '50%',
          borderRadius: verticalScale(20),
        }}
      />
    ) : (
      <View />
    );
  };

  const openShareDialogAsync = async () => {
    const imageTmp = await ImageManipulator.manipulateAsync(photo);
    await Sharing.shareAsync(imageTmp.uri);
  };

  const renderPhotoCtaBtn = () => {
    if (!photo) {
      return (
        <Button
          style={{ marginTop: verticalScale(spacing[20]) }}
          variant="primary"
          onPress={handleOpenCamera}>
          Take a picture
        </Button>
      );
    }
    return (
      <Button
        style={{ marginTop: verticalScale(spacing[20]) }}
        variant="primary"
        onPress={openShareDialogAsync}>
        Share this photo
      </Button>
    );
  };
  return (
    <SafeAreaView style={{ paddingHorizontal: spacing.layout, flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={{ marginTop: verticalScale(spacing[16]), flex: 0.9, alignItems: 'center' }}>
        <View style={{ width: '100%', alignItems: 'center', flex: 0.8 }}>
          <CText variant="h3Medium" style={{ textAlign: 'center' }}>
            Let's share your moment together!
          </CText>
          {renderProfilePicture()}
          {renderPhotoCtaBtn()}
        </View>
        <View
          style={{
            flex: 0.2,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: verticalScale(spacing[12]),
          }}>
          <Button
            variant="primary-text"
            size="s"
            onPress={() => {
              Alert.alert(`${matchedUser.nickname} has been added to your friend lists`);
            }}>
            {`Add ${matchedUser.nickname} to your friend lists?`}
          </Button>
        </View>
      </View>
      <View style={{ flex: 0.1, marginBottom: verticalScale(spacing[24]) }}>
        <Button
          variant="primary"
          onPress={() => {
            setUser({ ...user, matched: false });
            setMatchedUser(null);
          }}>
          Back to home screen
        </Button>
      </View>
    </SafeAreaView>
  );
};
