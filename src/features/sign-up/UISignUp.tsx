import { useFocusEffect } from '@react-navigation/native';
import { CText } from '@src/components/atoms/CText';
import { colors, spacing } from '@src/theme';
import { verticalScale } from '@src/utils/scale';
import { memo, ReactNode, useCallback, useRef, useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOTAL_SIGN_UP_STEP = 7;

export function SignUpContainer({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar backgroundColor="transparent" translucent />
      {children}
    </SafeAreaView>
  );
}

export function SignUpStepper({ currentStep }: { currentStep: number }) {
  return (
    <CText style={{ alignSelf: 'flex-end' }} variant="subtitle">
      {`${currentStep}/${TOTAL_SIGN_UP_STEP}`}
    </CText>
  );
}

export const OTPInput = ({
  code,
  onChangeCode,
  maximumLength,
}: {
  code: string;
  onChangeCode: (val: string) => void;
  maximumLength: number;
}) => {
  const [isInputFieldFocused, setIsInputFieldFocused] = useState(false);
  const inputArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      handleOnPress();
    }, [])
  );

  const handleOnPress = () => {
    setIsInputFieldFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputFieldFocused(false);
  };

  const inputDigit = (index: number) => {
    const digit = code[index] || '';

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);
    const isCurrentInputFocused = isInputFieldFocused && isValueFocused;

    return (
      <View
        key={index}
        style={[
          styles.codeInput,
          isCurrentInputFocused && styles.codeInputFocus,
          { minWidth: `${80 / maximumLength}%` },
        ]}>
        <CText variant="h4">{digit}</CText>
      </View>
    );
  };

  return (
    <Pressable onPress={handleOnPress}>
      <View style={styles.codeInputsContainer}>{inputArray.map((_, idx) => inputDigit(idx))}</View>
      <TextInput
        style={styles.textInputHidden}
        value={code}
        onChangeText={onChangeCode}
        maxLength={maximumLength}
        ref={inputRef}
        keyboardType="numeric"
        onBlur={handleOnBlur}
        autoComplete={'sms-otp'}
      />
    </Pressable>
  );
};

export const Interest = memo(
  ({
    handlePressInterest,
    title,
  }: {
    handlePressInterest: (title: string) => void;
    title: string;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePressInterest(title)}
        style={[
          {
            paddingVertical: spacing[4],
            paddingHorizontal: spacing[8],
            margin: spacing[4],
            borderWidth: 1,
            borderColor: colors.brand.secondary,
            borderRadius: spacing[32],
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <CText
          variant="subtitle"
          style={[{ color: colors.brand.secondary, marginRight: spacing[4] }]}>
          {title}
        </CText>
        <CText variant="h5Medium" style={[{ color: colors.brand.secondaryDark }]}>
          x
        </CText>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout,
    paddingTop: verticalScale(spacing[56]),
  },
  codeInputsContainer: {
    minHeight: spacing[36],
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  codeInput: {
    borderBottomWidth: 1,
    borderColor: colors.base.gray,
    alignItems: 'center',
  },
  codeInputFocus: {
    borderColor: colors.brand.primary,
  },
  textInputHidden: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
  },
  signUpStepper: {
    alignSelf: 'flex-end',
  },
});
