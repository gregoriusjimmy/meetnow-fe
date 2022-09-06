import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { InputField } from '@components/atoms/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { i18n } from '@utils/i18n';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { nicknameAtom } from './atoms';

type TInputUsernameScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputUsername'
>;

export function InputUsernameScreen() {
  //TODO: refactor nickname to be username
  const navigation = useNavigation<TInputUsernameScreenNavigationProp>();
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [errorUsername, setErrorUsername] = useState('');

  const handleChangeUsername = (val: string) => {
    //TODO: Add username validation
    // if (/[\s\d\W]/.test(val)) return;
    setNickname(val);
  };

  const handlePressContinue = () => {
    if (nickname.length < 3) {
      setErrorUsername(i18n.t('sign_up_username_min_error'));
      return;
    }
    setErrorUsername('');
    navigation.push('InputBirthDate');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={2} />
      <CText variant="h2Medium">{i18n.t('sign_up_username_question')}</CText>
      <View style={styles.content}>
        <InputField
          value={nickname}
          onChangeText={handleChangeUsername}
          autoFocus
          placeholder={i18n.t('sign_up_username_placeholder')}
          maxLength={10}
          autoComplete={'name'}
          error={errorUsername}
        />
      </View>
      <Button disabled={!nickname} variant="primary" size="l" onPress={handlePressContinue}>
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
