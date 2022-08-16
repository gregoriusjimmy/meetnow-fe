import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { spacing } from '@src/theme';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';

type TInputGenderScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputGender'
>;

export function InputGenderScreen() {
  const navigation = useNavigation<TInputGenderScreenNavigationProp>();

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={4} />
      <CText variant="h2Medium">What is your gender?</CText>
      <View style={styles.content}>
        <Button
          style={styles.firstBtn}
          variant="primary-outline"
          size="l"
          onPress={() => navigation.push('UploadProfilePicture')}>
          I'm a Male
        </Button>
        <Button
          variant="secondary-outline"
          size="l"
          onPress={() => navigation.push('UploadProfilePicture')}>
          I'm a Female
        </Button>
      </View>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flex: 0.8,
  },
  firstBtn: {
    marginBottom: spacing[16],
  },
});
