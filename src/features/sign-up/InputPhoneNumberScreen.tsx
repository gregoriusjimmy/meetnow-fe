import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { i18n } from '@src/utils/i18n';
import { spacing } from '@src/utils/theme';
import { useAtom } from 'jotai';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer } from './UISignUp';
import { phoneNumberAtom } from './atoms';

type TInputOTPScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputPhoneNumber'
>;

export function InputPhoneNumberScreen() {
  const navigation = useNavigation<TInputOTPScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom);

  const handlePressContinue = () => {
    // TODO: prefix validation
    setPhoneNumber('62' + phoneNumber);
    navigation.push('InputOTP');
  };

  return (
    <SignUpContainer>
      <CText style={styles.title} variant="h2Medium">
        {i18n.t('sign_up_input_phone_number')}
      </CText>
      <View style={styles.content}>
        <InputField
          editable={false}
          value={'+62'}
          style={styles.firstInput}
          width={'16%'}
          keyboardType="number-pad"
        />
        <InputField
          autoFocus
          value={phoneNumber}
          placeholder={i18n.t('sign_up_phone_number_placeholder')}
          style={styles.phoneNumber}
          keyboardType="number-pad"
          autoComplete="tel"
          maxLength={14}
          onChangeText={(val) => setPhoneNumber(val)}
        />
      </View>
      <Button style={styles.btn} variant="primary" size="l" onPress={handlePressContinue}>
        {i18n.t('sign_up_continue')}
      </Button>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flexDirection: 'row',
  },
  firstInput: {
    marginRight: spacing[16],
  },
  phoneNumber: { flexGrow: 1 },
  btn: {
    marginTop: spacing[56],
  },
  title: {
    marginBottom: spacing[56],
  },
});
