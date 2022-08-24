import { colors } from '@src/theme';
import { moderateScale } from '@src/utils/scale';
import { forwardRef } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface Props extends TextProps {
  children: string;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h1Medium'
    | 'h2Medium'
    | 'h3Medium'
    | 'h4Medium'
    | 'h5Medium'
    | 'h1Bold'
    | 'h2Bold'
    | 'h3Bold'
    | 'h4Bold'
    | 'h5Bold'
    | 'p'
    | 'subtitle'
    | 'subtitleMedium'
    | 'caption';
  color?: 'light' | 'dark' | 'error';
}

export const CText = forwardRef<Text, Props>(
  ({ style, variant = 'subtitle', color = 'dark', children, ...otherProps }, ref) => {
    return (
      <Text ref={ref} style={[styles[variant], styles[color], style]} {...otherProps}>
        {children}
      </Text>
    );
  }
);

export const CTEXT = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-Semibold',
    bold: 'Poppins-Bold',
  },
  fontSize: {
    h1: 38,
    h2: 30,
    h3: 24,
    h4: 20,
    h5: moderateScale(18),
    subtitle: 16,
    p: 14,
    caption: 14,
  },
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.h1,
  },
  h2: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.h2,
  },
  h3: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.h3,
  },
  h4: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.h4,
  },
  h5: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.h5,
  },
  h1Medium: {
    fontFamily: CTEXT.fontFamily.medium,
    fontSize: CTEXT.fontSize.h1,
  },
  h2Medium: {
    fontFamily: CTEXT.fontFamily.medium,
    fontSize: CTEXT.fontSize.h2,
  },
  h3Medium: {
    fontFamily: CTEXT.fontFamily.medium,
    fontSize: CTEXT.fontSize.h3,
  },
  h4Medium: {
    fontFamily: CTEXT.fontFamily.medium,
    fontSize: CTEXT.fontSize.h4,
  },
  h5Medium: {
    fontFamily: CTEXT.fontFamily.medium,
    fontSize: CTEXT.fontSize.h5,
  },
  h1Bold: {
    fontFamily: CTEXT.fontFamily.bold,
    fontSize: CTEXT.fontSize.h1,
  },
  h2Bold: {
    fontFamily: CTEXT.fontFamily.bold,
    fontSize: CTEXT.fontSize.h2,
  },
  h3Bold: {
    fontFamily: CTEXT.fontFamily.bold,
    fontSize: CTEXT.fontSize.h3,
  },
  h4Bold: {
    fontFamily: CTEXT.fontFamily.bold,
    fontSize: CTEXT.fontSize.h4,
  },
  h5Bold: {
    fontFamily: CTEXT.fontFamily.bold,
    fontSize: CTEXT.fontSize.h5,
  },
  subtitle: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.subtitle,
  },
  subtitleMedium: {
    fontFamily: CTEXT.fontFamily.medium,
    fontSize: CTEXT.fontSize.subtitle,
  },
  p: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.p,
  },
  caption: {
    fontFamily: CTEXT.fontFamily.regular,
    fontSize: CTEXT.fontSize.caption,
  },
  light: {
    color: colors.base.white,
  },
  dark: {
    color: colors.base.black,
  },
  error: {
    color: 'red',
  },
});
