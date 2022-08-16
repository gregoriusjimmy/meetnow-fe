import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';

type TInputNicknameScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputNickname'
>;

export function InputNicknameScreen() {
  const navigation = useNavigation<TInputNicknameScreenNavigationProp>();

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={2} />
      <CText variant="h2Medium">What is your name?</CText>
      <View style={styles.content}>
        <InputField autoFocus placeholder="Nickname" maxLength={10} autoComplete={'name'} />
      </View>
      <Button variant="primary" size="l" onPress={() => navigation.push('InputBirthday')}>
        Continue
      </Button>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flex: 0.9,
  },
});
