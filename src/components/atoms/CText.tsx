import { colors } from '@src/theme';
import { forwardRef } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface Props extends TextProps {
  children: string;
  variant:
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
    | 'subtitle';
  color?: 'light' | 'dark';
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
    h5: 18,
    subtitle: 16,
    p: 14,
  },
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 38,
  },
  h2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
  },
  h3: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
  },
  h4: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  h5: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  h1Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 38,
  },
  h2Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
  },
  h3Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
  },
  h4Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  h5Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  h1Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 38,
  },
  h2Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
  },
  h3Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  h4Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  h5Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  p: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 187.5,
  },
  light: {
    color: colors.base.white,
  },
  dark: {
    color: colors.base.black,
  },
});
