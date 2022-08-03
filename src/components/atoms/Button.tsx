import { forwardRef } from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

interface Props extends TouchableOpacityProps {}

export const CText = forwardRef<Text, Props>(
  ({ style, variant, children, ...otherProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[styles[variant], style]}
        {...otherProps}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

export const style;
