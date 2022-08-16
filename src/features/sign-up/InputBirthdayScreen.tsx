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

type TInputBirthdayScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputBirthday'
>;

export function InputBirthdayScreen() {
  const navigation = useNavigation<TInputBirthdayScreenNavigationProp>();

  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  const handleChangeInput = (
    val: string,
    inputLength?: number,
    ref?: React.RefObject<TextInput>
  ) => {
    if (ref && inputLength === val.length) ref.current?.focus();
  };
  return (
    <SignUpContainer>
      <SignUpStepper currentStep={3} />
      <CText variant="h2Medium">When is your birthday?</CText>
      <View style={styles.content}>
        <InputField
          autoFocus
          style={styles.dateInputField}
          onChangeText={(val) => handleChangeInput(val, 2, inputRef2)}
          keyboardType="numeric"
          placeholder="DD"
          maxLength={2}
          blurOnSubmit={false}
          onSubmitEditing={() => inputRef2.current?.focus()}
        />
        <CText style={styles.slash} variant="h4">
          /
        </CText>
        <InputField
          ref={inputRef2}
          style={styles.dateInputField}
          onChangeText={(val) => handleChangeInput(val, 2, inputRef3)}
          keyboardType="numeric"
          placeholder="MM"
          maxLength={2}
          blurOnSubmit={false}
          onSubmitEditing={() => inputRef3.current?.focus()}
        />
        <CText style={styles.slash} variant="h4">
          /
        </CText>
        <InputField
          ref={inputRef3}
          style={styles.dateInputField}
          keyboardType="numeric"
          placeholder="YYYY"
          maxLength={4}
        />
      </View>
      <Button variant="primary" size="l" onPress={() => navigation.push('InputGender')}>
        Continue
      </Button>
    </SignUpContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.9,
  },
  dateInputField: {
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
  },
  slash: {
    marginRight: spacing[8],
  },
});
