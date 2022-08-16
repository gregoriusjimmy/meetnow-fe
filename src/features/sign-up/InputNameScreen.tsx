import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { spacing } from '@src/theme';
import { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';

type TInputNameScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'InputName'>;

export function InputNameScreen() {
  const navigation = useNavigation<TInputNameScreenNavigationProp>();
  const lastNameInputRef = useRef<TextInput>(null);

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={1} />
      <CText variant="h2Medium">What is your name?</CText>
      <View style={styles.content}>
        <InputField
          autoFocus
          style={styles.firstNameInput}
          placeholder="First Name"
          onSubmitEditing={() => lastNameInputRef.current?.focus()}
          blurOnSubmit={false}
          maxLength={20}
          autoComplete={'name-prefix'}
        />
        <InputField ref={lastNameInputRef} placeholder="Last Name" autoComplete={'name-suffix'} />
      </View>
      <Button variant="primary" size="l" onPress={() => navigation.push('InputNickname')}>
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
  firstNameInput: {
    marginBottom: spacing[40],
  },
});
