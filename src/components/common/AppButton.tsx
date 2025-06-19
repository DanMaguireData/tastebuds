// React
import React from "react";
// Components
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  PressableProps,
} from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { AppText } from "./AppText";
import { spacing } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "destructive";

interface AppButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export function AppButton({
  title,
  onPress,
  variant = "primary",
  isLoading = false,
  disabled = false,
  style,
  ...rest
}: AppButtonProps) {
  const { theme } = useTheme();
  const isDisabled = isLoading || disabled;

  let backgroundColor = "transparent";
  let borderColor = theme.primary;
  let textColor = theme.primary;

  if (variant === "primary") {
    backgroundColor = theme.primary;
    borderColor = "transparent";
    textColor = theme.textPrimary;
  } else if (variant === "secondary") {
    backgroundColor = theme.secondary;
    borderColor = "transparent";
    textColor = theme.textPrimary;
  } else if (variant === "destructive") {
    backgroundColor = theme.error;
    borderColor = "transparent";
    textColor = "#FFFFFF";
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: backgroundColor,
          borderRadius: spacing.sm, // Consistent border radius
        },
        // Apply border for outline variant
        variant === "outline" && {
          borderWidth: 2,
          borderColor: borderColor,
        },
        // Handle disabled state
        isDisabled && styles.disabled,
        // Handle press feedback animation
        pressed && !isDisabled && styles.pressed,
        style as ViewStyle, // Allow custom style overrides
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <AppText variant="button" style={{ color: textColor }}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
