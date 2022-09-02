import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { InputField } from '@components/atoms/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { i18n } from '@utils/i18n';
import { spacing } from '@utils/theme';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { firstNameAtom, lastNameAtom } from './atoms';

type TInputNameScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'InputName'>;

export function InputNameScreen() {
  const navigation = useNavigation<TInputNameScreenNavigationProp>();
  const lastNameInputRef = useRef<TextInput>(null);
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [errorFirstName, setErrorFirstName] = useState('');

  const handleChangeFirstName = (val: string) => {
    if (/[\s\d\W]/.test(val)) return;
    setFirstName(val);
  };

  const handleChangeLastName = (val: string) => {
    if (/[\s\d\W]/.test(val)) return;
    setLastName(val);
  };

  const handlePressContinue = () => {
    if (firstName.length < 3) {
      setErrorFirstName(i18n.t('sign_up_first_name_min_error'));
      return;
    }
    setErrorFirstName('');
    setFirstName(firstName.charAt(0).toUpperCase() + firstName.slice(1));
    setLastName(lastName.charAt(0).toUpperCase() + lastName.slice(1));
    navigation.push('InputNickname');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={1} />
      <CText variant="h2Medium">{i18n.t('sign_up_name_question')}</CText>
      <View style={styles.content}>
        <InputField
          value={firstName}
          onChangeText={handleChangeFirstName}
          autoFocus
          style={styles.firstNameInput}
          placeholder={i18n.t('sign_up_first_name_placeholder')}
          onSubmitEditing={() => lastNameInputRef.current?.focus()}
          blurOnSubmit={false}
          maxLength={20}
          autoComplete={'name-prefix'}
          error={errorFirstName}
        />

        <InputField
          ref={lastNameInputRef}
          value={lastName}
          onChangeText={handleChangeLastName}
          placeholder={i18n.t('sign_up_last_name_placeholder')}
          autoComplete={'name-suffix'}
        />
      </View>
      <Button
        disabled={!firstName || !lastName}
        variant="primary"
        size="l"
        onPress={handlePressContinue}>
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
  firstNameInput: {
    marginBottom: spacing[40],
  },
});
