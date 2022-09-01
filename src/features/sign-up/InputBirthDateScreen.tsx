import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { scale } from '@src/utils/scale';
import { spacing } from '@src/utils/theme';
import { useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SignUpContainer, SignUpStepper } from './UISignUp';
import { birthDateAtom } from './atoms';

type TInputBirthDateScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputBirthDate'
>;
const CURRENT_YEAR = new Date().getFullYear();
const LOWER_BOUND_YEAR = CURRENT_YEAR - 80;

export function InputBirthDateScreen() {
  const navigation = useNavigation<TInputBirthDateScreenNavigationProp>();
  const setBirthDate = useSetAtom(birthDateAtom);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  const isDayValid = (val: string) => {
    const len = val.length;
    const arrVal = val.split('');
    if (len === 1 && Number(val) > 3) return false;
    if (len === 2) {
      if (arrVal[0] === '0' && arrVal[1] === '0') return false;
      if (Number(arrVal[0]) === 3 && Number(arrVal[1]) > 1) return false;
    }
    return true;
  };

  const isMonthValid = (val: string) => {
    const len = val.length;
    const arrVal = val.split('');
    if (len === 1 && Number(val) > 1) return false;
    if (len === 2) {
      if (arrVal[0] === '0' && arrVal[1] === '0') return false;
      if (Number(arrVal[0]) === 1 && Number(arrVal[1]) > 2) return false;
    }
    return true;
  };

  const isYearValid = (val: string) => {
    const len = val.length;
    const strCurrentYear = CURRENT_YEAR.toString();
    const strLowerBoundYear = LOWER_BOUND_YEAR.toString();
    const numberVal = Number(val);
    if (val === '0') return false;
    if (len === 1 && numberVal > Number(strCurrentYear.charAt(0))) return false;
    if (len === 2 && numberVal - Number(strCurrentYear.slice(0, 2)) > 1) return false;
    if (len === 2 && numberVal < Number(strLowerBoundYear.slice(0, 2))) return false;
    if (len === 3 && numberVal - Number(strCurrentYear.slice(0, 3)) > 10) return false;
    if (len === 3 && numberVal < Number(strLowerBoundYear.slice(0, 3))) return false;
    if (numberVal > CURRENT_YEAR) return false;
    return true;
  };

  const handleChangeInput = (
    val: string,
    type: 'day' | 'month' | 'year',
    nextRef?: React.RefObject<TextInput>
  ) => {
    const focusNext = () => {
      val.length === 2 && nextRef?.current?.focus();
    };
    if (/[\D]/.test(val)) return;
    if (type === 'day' && isDayValid(val)) {
      setDay(val);
      focusNext();
    }
    if (type === 'month' && isMonthValid(val)) {
      setMonth(val);
      focusNext();
    }
    if (type === 'year' && isYearValid(val)) setYear(val);
  };

  const handleDisabledContinue = () => {
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) return true;
    return false;
  };

  const handlePressContinue = () => {
    // TODO: handle error under age
    setBirthDate({ day: Number(day), month: Number(month), year: Number(year) });
    navigation.push('InputGender');
  };

  return (
    <SignUpContainer>
      <SignUpStepper currentStep={3} />
      <CText variant="h2Medium">When is your birthday?</CText>
      <View style={styles.content}>
        <InputField
          value={day}
          onChangeText={(val) => handleChangeInput(val, 'day', inputRef2)}
          autoFocus
          styleInput={styles.dateInputField}
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
          value={month}
          onChangeText={(val) => handleChangeInput(val, 'month', inputRef3)}
          ref={inputRef2}
          styleInput={styles.dateInputField}
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
          value={year}
          onChangeText={(val) => handleChangeInput(val, 'year')}
          ref={inputRef3}
          styleInput={styles.dateInputField}
          keyboardType="numeric"
          placeholder="YYYY"
          maxLength={4}
        />
      </View>
      <Button
        disabled={handleDisabledContinue()}
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.9,
  },
  dateInputField: {
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
    minWidth: scale(spacing[40]),
  },
  slash: {
    marginRight: spacing[8],
  },
});
