import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
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
      setErrorUsername(`Username cannot less than 3 characters`);
      return;
    }
    setErrorUsername('');
    navigation.push('InputInterests');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={5} />
      <CText variant="h2Medium">What is your instagram's username?</CText>
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
          This will be used to communicate with your new mate to arrange the meeting location.
        </CText>
      </View>
      <Button disabled={!username} variant="primary" size="l" onPress={handlePressContinue}>
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
