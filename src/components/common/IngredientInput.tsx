// React
import React from "react";
// Componetns
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  View,
} from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { ThemeColors, spacing, textVariants } from "@/constants/theme";

interface IngredientInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const IngredientInput = React.forwardRef<
  TextInput,
  IngredientInputProps
>(({ style, containerStyle, ...rest }, ref) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={containerStyle}>
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor={theme.input.placeholder}
        {...rest}
      />
    </View>
  );
});

// Define display name for better debugging
IngredientInput.displayName = "IngredientInput";

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    input: {
      height: 50,
      backgroundColor: theme.surface,
      borderRadius: spacing.sm,
      borderWidth: 1.5,
      borderColor: theme.input.border,
      paddingHorizontal: spacing.sm,
      color: theme.textPrimary,
      fontFamily: textVariants.body.fontFamily,
      fontSize: textVariants.body.fontSize,
      textAlign: "center",
    },
  });
