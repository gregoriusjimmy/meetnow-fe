import { Button } from '@components/atoms/Button';
import { CText } from '@components/atoms/CText';
import { InputField } from '@components/atoms/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { i18n } from '@utils/i18n';
import { spacing } from '@utils/theme';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Interest, SignUpContainer, SignUpStepper } from './UISignUp';
import { interestsAtom } from './atoms';

type TInputInterestsScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputInterests'
>;

export function InputInterestsScreen() {
  const navigation = useNavigation<TInputInterestsScreenNavigationProp>();
  const [interests, setInterests] = useAtom(interestsAtom);
  const [inputInterest, setInputInterest] = useState('');

  const handlePressContinue = () => {
    navigation.push('UploadProfilePicture');
  };

  const handleAddInterest = () => {
    if (inputInterest.length === 0) return;
    setInterests([...interests, inputInterest]);
    setInputInterest('');
  };

  const handleDeleteInterest = (title: string) => {
    setInterests(interests.filter((interest) => interest !== title));
  };
  return (
    <SignUpContainer>
      <SignUpStepper currentStep={6} />
      <CText variant="h2Medium">{i18n.t('sign_up_interest_question')}</CText>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 0.8,
          }}>
          {interests.map((interest, idx) => {
            return (
              <Interest key={idx} handlePressInterest={handleDeleteInterest} title={interest} />
            );
          })}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <InputField
            blurOnSubmit={false}
            autoFocus
            placeholder={i18n.t('sign_up_interest_placeholder')}
            maxLength={30}
            value={inputInterest}
            onChangeText={(val) => setInputInterest(val)}
            onSubmitEditing={handleAddInterest}
            style={{ flexGrow: 1 }}
          />
          <Button onPress={handleAddInterest} variant="primary" size={'s'}>
            {i18n.t('sign_up_add')}
          </Button>
        </View>
        <CText variant="p">{i18n.t('sign_up_interest_message')}</CText>
      </View>
      <Button
        disabled={interests.length < 1 || interests.length > 5}
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
    flex: 0.9,
    marginTop: spacing[16],
    marginBottom: spacing[16],
  },
});
