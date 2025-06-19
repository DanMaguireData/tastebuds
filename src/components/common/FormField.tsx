// React
import React, { useState } from "react";
// Components
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { AppText } from "./AppText";
import { Spacer } from "../layout/Spacer";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { ThemeColors, spacing, textVariants } from "@/constants/theme";

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
}

export const FormField = React.forwardRef<TextInput, FormFieldProps>(
  (
    {
      label,
      error,
      containerStyle,
      helperText,
      onFocus,
      onBlur,
      rightIcon,
      style,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus: TextInputProps["onFocus"] = (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur: TextInputProps["onBlur"] = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const borderColor = error
      ? theme.error
      : isFocused
        ? theme.input.borderFocused
        : theme.input.border;

    return (
      <View style={containerStyle}>
        <AppText variant="caption" color="textSecondary" style={styles.label}>
          {label}
        </AppText>
        <Spacer size="xs" />

        {helperText && (
          <>
            <AppText variant="caption" color="textHint">
              {helperText}
            </AppText>
            <Spacer size="xs" />
          </>
        )}
        <View style={[styles.inputContainer, { borderColor }]}>
          <TextInput
            style={[styles.input, style]}
            placeholderTextColor={theme.input.placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />
          {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
        {error && (
          <>
            <Spacer size="xs" />
            <AppText variant="caption" color="error">
              {error}
            </AppText>
          </>
        )}
      </View>
    );
  },
);

// Define display name for better debugging
FormField.displayName = "FormField";

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    label: {
      // You might want a specific 'label' color in your theme
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.input.background,
      borderRadius: spacing.sm,
      borderWidth: 1.5,
      height: 50,
    },
    input: {
      flex: 1,
      paddingHorizontal: spacing.md,
      color: theme.input.text,
      fontFamily: textVariants.body.fontFamily,
      fontSize: textVariants.body.fontSize,
      height: "100%",
    },
    iconContainer: {
      paddingHorizontal: spacing.md,
    },
  });
