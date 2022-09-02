import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { i18n } from '@src/utils/i18n';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { firstNameAtom, nicknameAtom } from './atoms';

type TInputNicknameScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputNickname'
>;

export function InputNicknameScreen() {
  const navigation = useNavigation<TInputNicknameScreenNavigationProp>();
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const firstName = useAtomValue(firstNameAtom);
  const [errorNickname, setErrorNickname] = useState('');

  useEffect(() => {
    !nickname && setNickname(firstName);
  }, []);

  const handleChangeNickname = (val: string) => {
    if (/[\s\d\W]/.test(val)) return;
    setNickname(val);
  };

  const handlePressContinue = () => {
    if (nickname.length < 3) {
      setErrorNickname(i18n.t('sign_up_nickname_min_error'));
      return;
    }
    setErrorNickname('');
    navigation.push('InputBirthDate');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={2} />
      <CText variant="h2Medium">{i18n.t('sign_up_nickname_question')}</CText>
      <View style={styles.content}>
        <InputField
          value={nickname}
          onChangeText={handleChangeNickname}
          autoFocus
          placeholder={i18n.t('sign_up_nickname_placeholder')}
          maxLength={10}
          autoComplete={'name'}
          error={errorNickname}
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
