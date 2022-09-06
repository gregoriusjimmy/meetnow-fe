import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { InputField } from '@components/atoms/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { i18n } from '@utils/i18n';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { firstNameAtom, lastNameAtom } from './atoms';

type TInputNameScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'InputName'>;

export function InputNameScreen() {
  //TODO: refactor firstName + lastName to be Name
  const navigation = useNavigation<TInputNameScreenNavigationProp>();
  const lastNameInputRef = useRef<TextInput>(null);
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [, setLastName] = useAtom(lastNameAtom);
  const [errorName, setErrorName] = useState('');

  const handleChangeName = (val: string) => {
    if (/[\s\d\W]/.test(val)) return;
    setFirstName(val);
  };

  const handlePressContinue = () => {
    if (firstName.length < 3) {
      setErrorName(i18n.t('sign_up_name_min_error'));
      return;
    }
    setErrorName('');
    setFirstName(firstName.charAt(0).toUpperCase() + firstName.slice(1));
    setLastName(firstName);
    navigation.push('InputUsername');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={1} />
      <CText variant="h2Medium">{i18n.t('sign_up_name_question')}</CText>
      <View style={styles.content}>
        <InputField
          value={firstName}
          onChangeText={handleChangeName}
          autoFocus
          placeholder={i18n.t('sign_up_name_placeholder')}
          onSubmitEditing={() => lastNameInputRef.current?.focus()}
          blurOnSubmit={false}
          maxLength={20}
          autoComplete={'name'}
          error={errorName}
        />
      </View>
      <Button disabled={!firstName} variant="primary" size="l" onPress={handlePressContinue}>
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
});
