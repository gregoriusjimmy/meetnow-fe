import { colors, spacing } from '@src/theme';
import { forwardRef } from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'white' | 'primary-outline' | 'secondary-outline';
  children: string;
  fullWidth?: boolean;
  textStyle?: StyleProp<TextStyle>;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<TouchableOpacity, Props>(
  (
    {
      size = 'm',
      variant = 'white',
      fullWidth = true,
      iconPosition = 'left',
      disabled,
      icon,
      style,
      children,
      textStyle,
      ...otherProps
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[
          stylesBtn.base,
          variant.includes('outline') && stylesBtn.baseOutline,
          stylesBtn[size],
          stylesBtn[variant],
          disabled && stylesBtn.disabled,
          fullWidth && stylesBtn.fullWidth,
          style,
        ]}
        activeOpacity={0.8}
        disabled={disabled}
        {...otherProps}>
        {iconPosition === 'left' && icon && <View style={stylesBtn.iconLeft}>{icon}</View>}
        <Text style={[stylesText.base, stylesText[variant], stylesText[size], textStyle]}>
          {children}
        </Text>
        {iconPosition === 'right' && icon && <View style={stylesBtn.iconRight}>{icon}</View>}
      </TouchableOpacity>
    );
  }
);

export const BUTTON = {
  fontSize: {
    s: 12,
    m: 14,
    l: 16,
  },
};

const stylesText = StyleSheet.create({
  base: {
    fontFamily: 'Poppins-Semibold',
    textAlign: 'center',
  },
  s: {
    fontSize: BUTTON.fontSize.s,
  },
  m: {
    fontSize: BUTTON.fontSize.m,
  },
  l: {
    fontSize: BUTTON.fontSize.l,
  },
  primary: {
    color: colors.base.white,
  },
  'primary-outline': {
    color: colors.brand.primary,
  },
  'secondary-outline': {
    color: colors.brand.secondary,
  },
  secondary: {
    color: colors.base.white,
  },
  white: {
    color: colors.base.black,
  },
});

const stylesBtn = StyleSheet.create({
  base: {
    elevation: 4,
    borderRadius: spacing[24],
    paddingVertical: spacing[12],
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  baseOutline: {
    borderWidth: 1,
    elevation: 1,
    backgroundColor: colors.base.white,
  },
  disabled: {
    backgroundColor: colors.base.lightGray,
    elevation: 0,
  },
  s: {
    paddingHorizontal: spacing[24],
  },
  m: {
    paddingHorizontal: spacing[32],
  },
  l: {
    paddingHorizontal: spacing[40],
  },
  primary: {
    backgroundColor: colors.brand.primary,
  },
  'primary-outline': {
    borderColor: colors.brand.primary,
  },
  'secondary-outline': {
    borderColor: colors.brand.secondary,
  },
  secondary: {
    backgroundColor: colors.brand.secondary,
  },
  white: {
    backgroundColor: colors.base.white,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  iconLeft: {
    marginRight: spacing[8],
  },
  iconRight: {
    marginLeft: spacing[8],
  },
});
