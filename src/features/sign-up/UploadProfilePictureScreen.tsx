import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import ProfilePicture from '@src/components/icons/ProfilePicture';
import { colors, spacing } from '@src/theme';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';

type TUploadProfilePictureScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'UploadProfilePicture'
>;

const IMAGE_PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.2,
};

export function UploadProfilePictureScreen() {
  const navigation = useNavigation<TUploadProfilePictureScreenNavigationProp>();
  const [statusCamera, requestPermissionCamera] = ImagePicker.useCameraPermissions();
  const [statusMediaLib, requestPermissionMediaLib] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState('');

  const handleOpenCamera = async () => {
    if (!statusCamera?.granted) await requestPermissionCamera();
    if (statusCamera?.granted) {
      const result = await ImagePicker.launchCameraAsync(IMAGE_PICKER_OPTIONS);
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const handleOpenMediaLib = async () => {
    if (!statusMediaLib?.granted) await requestPermissionMediaLib();
    if (statusMediaLib?.granted) {
      const result = await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const renderProfilePicture = () => {
    return image ? (
      <Image source={{ uri: image }} style={styles.profileImage} />
    ) : (
      <ProfilePicture />
    );
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={5} />
      <CText variant="h2Medium">Upload your profile picture</CText>
      <View style={styles.content}>
        {renderProfilePicture()}
        <View style={styles.actions}>
          <Button
            style={styles.openCamBtn}
            variant="primary-outline"
            size="l"
            onPress={handleOpenCamera}>
            Open camera
          </Button>
          <Button variant="primary-outline" size="l" onPress={handleOpenMediaLib}>
            Choose photo from phone
          </Button>
        </View>
      </View>
      <Button disabled={!image} variant="primary" size="l">
        Continue
      </Button>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
  },
  imagePicker: {
    borderRadius: spacing[56],
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  actions: { marginTop: spacing[48] },
  openCamBtn: { marginBottom: spacing[16] },
  profileImage: {
    width: 200,
    height: 200,
  },
});
