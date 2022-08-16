import { useFocusEffect } from '@react-navigation/native';
import { CText } from '@src/components/atoms/CText';
import { colors, spacing } from '@src/theme';
import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SignUpContainer({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
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

  useFocusEffect(useCallback(() => handleOnPress(), []));
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
        onBlur={handleOnBlur}
        autoComplete={'sms-otp'}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout,
    paddingTop: spacing[40] * 2,
  },
  codeInputsContainer: {
    minHeight: spacing[32],
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
  },
});
