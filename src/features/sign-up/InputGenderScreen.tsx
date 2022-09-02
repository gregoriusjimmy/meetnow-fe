import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { i18n } from '@src/utils/i18n';
import { spacing } from '@src/utils/theme';
import { useAtom } from 'jotai';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { genderAtom } from './atoms';

type TInputGenderScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputGender'
>;

export function InputGenderScreen() {
  const navigation = useNavigation<TInputGenderScreenNavigationProp>();
  const [gender, setGender] = useAtom(genderAtom);

  const handlePressContinue = () => {
    navigation.push('InputInstagramUsername');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={4} />
      <CText variant="h2Medium">{i18n.t('sign_up_gender_question')}</CText>
      <View style={styles.content}>
        <Button
          style={styles.firstBtn}
          variant={gender === 'male' ? 'primary-outline' : 'neutral-outline'}
          size="l"
          onPress={() => setGender('male')}>
          {i18n.t('sign_up_gender_male_choice')}
        </Button>
        <Button
          variant={gender === 'female' ? 'secondary-outline' : 'neutral-outline'}
          size="l"
          onPress={() => setGender('female')}>
          {i18n.t('sign_up_gender_female_choice')}
        </Button>
      </View>
      <Button disabled={!gender} variant="primary" size="l" onPress={handlePressContinue}>
        {i18n.t('sign_up_continue')}
      </Button>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flex: 0.9,
  },
  firstBtn: {
    marginBottom: spacing[16],
  },
});
