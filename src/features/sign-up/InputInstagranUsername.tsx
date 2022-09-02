import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { i18n } from '@src/utils/i18n';
import { spacing } from '@src/utils/theme';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { instagramUsernameAtom } from './atoms';

type TInputInstagramUsernameScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputInstagramUsername'
>;

export function InputInstagramUsernameScreen() {
  const navigation = useNavigation<TInputInstagramUsernameScreenNavigationProp>();
  const [username, setUsername] = useAtom(instagramUsernameAtom);
  const [errorUsername, setErrorUsername] = useState('');

  const handleChangeUsername = (val: string) => {
    setUsername(val);
  };

  const handlePressContinue = () => {
    if (username.length < 3) {
      setErrorUsername(i18n.t('sign_up_instagram_username_min_error'));
      return;
    }
    setErrorUsername('');
    navigation.push('InputInterests');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={5} />
      <CText variant="h2Medium">{i18n.t('sign_up_instagram_question')}</CText>
      <View style={styles.content}>
        <InputField
          value={username}
          onChangeText={handleChangeUsername}
          autoFocus
          placeholder="Instagram username"
          maxLength={30}
          autoComplete={'username'}
          error={errorUsername}
        />
        <CText variant="p" style={{ marginTop: spacing[4] }}>
          {i18n.t('sign_up_instagram_message')}
        </CText>
      </View>
      <Button disabled={!username} variant="primary" size="l" onPress={handlePressContinue}>
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
