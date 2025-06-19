// React
import React, { useState } from "react";
// Components
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  ViewStyle,
} from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { spacing, textVariants } from "@/constants/theme";

interface AppTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export function AppTextInput({
  style,
  containerStyle,
  onFocus,
  onBlur,
  ...rest
}: AppTextInputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus: TextInputProps["onFocus"] = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur: TextInputProps["onBlur"] = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const borderColor = isFocused
    ? theme.input.borderFocused
    : theme.input.border;

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input.background,
            color: theme.input.text,
            borderColor: borderColor,
            borderRadius: spacing.sm,
            fontFamily: textVariants.body.fontFamily,
            fontSize: textVariants.body.fontSize,
          },
          style,
        ]}
        placeholderTextColor={theme.input.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    paddingHorizontal: 16,
  },
});
