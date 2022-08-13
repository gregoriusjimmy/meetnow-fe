import { colors, spacing } from '@src/theme';
import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { CTEXT } from './CText';

interface Props extends TextInputProps {
  width?: string | number | undefined;
}

export const InputField = forwardRef<TextInput, Props>(({ width, style, ...otherProps }, ref) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <TextInput
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      ref={ref}
      style={[styles.base, isFocus && styles.focus, style, !!width && { width }]}
      selectionColor={colors.base.black}
      {...otherProps}
    />
  );
});

const styles = StyleSheet.create({
  base: {
    borderBottomWidth: 1,
    paddingHorizontal: spacing[4],
    fontSize: CTEXT.fontSize.h4,
    fontFamily: CTEXT.fontFamily.regular,
    color: colors.base.black,
  },
  focus: {
    borderColor: colors.brand.primary,
  },
});
