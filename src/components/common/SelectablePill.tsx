import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  PressableProps,
  Pressable,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors, spacing } from "@/constants/theme";
import { AppText } from "./AppText";

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
