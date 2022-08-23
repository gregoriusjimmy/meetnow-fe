import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { spacing } from '@src/theme';
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
    setInterests([...interests, inputInterest]);
    setInputInterest('');
  };

  const handleDeleteInterest = (title: string) => {
    setInterests(interests.filter((interest) => interest !== title));
  };
  return (
    <SignUpContainer>
      <SignUpStepper currentStep={6} />
      <CText variant="h2Medium">What makes you feel excited?</CText>
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
            placeholder="Interest"
            maxLength={30}
            value={inputInterest}
            onChangeText={(val) => setInputInterest(val)}
            onSubmitEditing={handleAddInterest}
            style={{ flexGrow: 1 }}
          />
          <Button onPress={handleAddInterest} variant="primary" size={'s'}>
            Add
          </Button>
        </View>
        <CText variant="p">You can add up to 5</CText>
      </View>
      <Button
        disabled={interests.length < 1 || interests.length > 5}
        variant="primary"
        size="l"
        onPress={handlePressContinue}>
        Continue
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
