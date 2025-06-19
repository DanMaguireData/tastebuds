// React
import React from "react";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { spacing } from "@/constants/theme";
// Components
import { AppText } from "./AppText";
import { StyleSheet, PressableProps, Pressable } from "react-native";

interface SelectablePillProps extends PressableProps {
  text: string;
  isSelected: boolean;
}

export function SelectablePill({
  text,
  isSelected,
  ...rest
}: SelectablePillProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        styles.pill,
        {
          borderColor: isSelected ? theme.primary : theme.input.border,
          backgroundColor: isSelected ? theme.primary : "transparent",
        },
      ]}
      {...rest}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <AppText
        variant="body"
        style={{ color: isSelected ? theme.surface : theme.textPrimary }}
      >
        {text}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
});
