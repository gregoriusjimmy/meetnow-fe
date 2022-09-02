import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { IconProfilePicture } from '@components/icons/ProfilePicture';
import { userAtom } from '@src/rootState';
import { i18n } from '@utils/i18n';
import { verticalScale } from '@utils/scale';
import { spacing } from '@utils/theme';
import * as ImagePicker from 'expo-image-picker';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Image, StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { photoAtom, signUpFormAtom } from './atoms';

const IMAGE_PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.2,
  base64: true,
};

export function UploadProfilePictureScreen() {
  const [statusCamera, requestPermissionCamera] = ImagePicker.useCameraPermissions();
  const [statusMediaLib, requestPermissionMediaLib] = ImagePicker.useMediaLibraryPermissions();
  const signUpFormData = useAtomValue(signUpFormAtom);
  const [photo, setPhoto] = useAtom(photoAtom);
  const setUser = useSetAtom(userAtom);

  const handleOpenCamera = async () => {
    if (!statusCamera?.granted) await requestPermissionCamera();
    const result = await ImagePicker.launchCameraAsync(IMAGE_PICKER_OPTIONS);
    if (!result.cancelled) {
      setPhoto(result.base64 ?? result.uri);
    }
  };

  const handleOpenMediaLib = async () => {
    if (!statusMediaLib?.granted) await requestPermissionMediaLib();
    const result = await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);
    if (!result.cancelled) {
      setPhoto(result.base64 ?? result.uri);
    }
  };

  const renderProfilePicture = () => {
    return photo ? (
      <Image source={{ uri: 'data:image/jpeg;base64,' + photo }} style={styles.profileImage} />
    ) : (
      <IconProfilePicture width={verticalScale(160)} height={verticalScale(160)} />
    );
  };

  const handlePressFinish = () => {
    setUser({ ...signUpFormData });
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={7} />
      <CText variant="h2Medium">{i18n.t('sign_up_upload_profile_question')}</CText>
      <View style={styles.content}>
        {renderProfilePicture()}
        <View style={styles.actions}>
          <Button
            style={styles.openCamBtn}
            variant="primary-outline"
            size="l"
            onPress={handleOpenCamera}>
            {i18n.t('sign_up_open_camera')}
          </Button>
          <Button variant="primary-outline" size="l" onPress={handleOpenMediaLib}>
            {i18n.t('sign_up_choose_photo_phone')}
          </Button>
        </View>
      </View>
      <Button disabled={!photo} variant="primary" size="l" onPress={handlePressFinish}>
        {i18n.t('sign_up_finish')}
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
  actions: { marginTop: verticalScale(spacing[40]), alignSelf: 'stretch' },
  openCamBtn: { marginBottom: spacing[16] },
  profileImage: {
    width: verticalScale(160),
    height: verticalScale(160),
    borderRadius: verticalScale(160),
  },
});
