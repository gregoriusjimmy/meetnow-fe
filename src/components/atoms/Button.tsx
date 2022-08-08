import { forwardRef } from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
} from "react-native";
import { colors, spacing } from "@src/theme";

interface Props extends TouchableOpacityProps {
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "white";
  fullWidth?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = forwardRef<TouchableOpacity, Props>(
  (
    {
      size = "m",
      variant = "white",
      fullWidth = false,
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
          stylesBtn[size],
          stylesBtn[variant],
          fullWidth && stylesBtn.fullWidth,
          style,
        ]}
        activeOpacity={0.8}
        {...otherProps}
      >
        <Text
          style={[
            stylesText.base,
            stylesText[variant],
            stylesText[size],
            textStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);
const stylesText = StyleSheet.create({
  base: {
    fontFamily: "Poppins-Semibold",
    textAlign: "center",
  },
  s: {
    fontSize: 12,
  },
  m: {
    fontSize: 14,
  },
  l: {
    fontSize: 16,
  },
  primary: {
    color: colors.base.white,
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
  secondary: {
    backgroundColor: colors.brand.secondary,
  },
  white: {
    backgroundColor: colors.base.white,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
});
