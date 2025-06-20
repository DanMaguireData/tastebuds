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
  mandatoryField?: boolean;
  inputHeight?: number;
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
      mandatoryField,
      rightIcon,
      inputHeight,
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

    const actualInputHeight = !inputHeight ? 50 : inputHeight;

    return (
      <View style={containerStyle}>
        <View style={styles.labelContainer}>
          <AppText variant="caption" color="textSecondary">
            {label}
          </AppText>
          {mandatoryField && (
            <AppText variant="caption" color="error">
              *
            </AppText>
          )}
        </View>
        <Spacer size="xs" />

        {helperText && (
          <>
            <AppText variant="caption" color="textHint">
              {helperText}
            </AppText>
            <Spacer size="xs" />
          </>
        )}
        <View
          style={[
            styles.inputContainer,
            { borderColor: borderColor, height: actualInputHeight },
          ]}
        >
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
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.input.background,
      borderRadius: spacing.sm,
      borderWidth: 1.5,
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
