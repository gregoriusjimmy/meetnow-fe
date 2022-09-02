import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { i18n } from '@utils/i18n';
import { spacing } from '@utils/theme';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { OTPInput, SignUpContainer } from './UISignUp';
import { phoneNumberAtom } from './atoms';

type TInputOTPScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputPhoneNumber'
>;

export function InputOTPScreen() {
  const navigation = useNavigation<TInputOTPScreenNavigationProp>();
  const [code, setCode] = useState('927482');
  // const [isComplete, setIsComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(true);
  const phoneNumber = useAtomValue(phoneNumberAtom);
  const CODE_LENGTH = 6;

  const handleChangeCode = (val: string) => {
    setCode(val);
    if (val.length === CODE_LENGTH) setIsComplete(true);
    else setIsComplete(false);
  };

  return (
    <SignUpContainer>
      <CText style={styles.title} variant="h2Medium">
        {i18n.t('sign_up_enter_code')}
      </CText>
      <View style={styles.resendContainer}>
        <CText variant="subtitle" style={styles.phoneNumber}>
          {phoneNumber || '+6289392838'}
        </CText>
        <Button variant="primary-outline" size="s">
          {i18n.t('sign_up_resend')}
        </Button>
      </View>
      <OTPInput code={code} maximumLength={CODE_LENGTH} onChangeCode={handleChangeCode} />
      <Button
        disabled={!isComplete}
        style={styles.btn}
        variant="primary"
        size="l"
        onPress={() => navigation.push('InputName')}>
        {i18n.t('sign_up_continue')}
      </Button>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[56],
  },
  phoneNumber: {
    marginRight: spacing[8],
  },
  btn: {
    marginTop: spacing[56],
  },
  title: {
    marginBottom: spacing[12],
  },
});
