import { forwardRef } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { colors } from "./../../theme";

interface Props extends TextProps {
  children: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h1Medium"
    | "h2Medium"
    | "h3Medium"
    | "h4Medium"
    | "h5Medium"
    | "h1Bold"
    | "h2Bold"
    | "h3Bold"
    | "h4Bold"
    | "h5Bold"
    | "paragraph"
    | "subtitle";
  color: "light" | "dark";
}

export const CText = forwardRef<Text, Props>(
  (
    { style, variant = "subtitle", color = "dark", children, ...otherProps },
    ref
  ) => {
    return (
      <Text
        ref={ref}
        style={[styles[variant], styles[color], style]}
        {...otherProps}
      >
        {children}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  h1: {
    fontFamily: "Poppins_400Regular",
    fontSize: 38,
  },
  h2: {
    fontFamily: "Poppins_400Regular",
    fontSize: 30,
  },
  h3: {
    fontFamily: "Poppins_400Regular",
    fontSize: 24,
  },
  h4: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  h5: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  h1Medium: {
    fontFamily: "Poppins_500Medium",
    fontSize: 38,
  },
  h2Medium: {
    fontFamily: "Poppins_500Medium",
    fontSize: 30,
  },
  h3Medium: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
  },
  h4Medium: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
  },
  h5Medium: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  h1Bold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 38,
  },
  h2Bold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 30,
  },
  h3Bold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
  },
  h4Bold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },
  h5Bold: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  paragraph: {
    fontFamily: "Poppins_400Regular",
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
