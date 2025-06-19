// React
import React from "react";
// Components
import { View, StyleSheet, ViewProps } from "react-native";
import { AppText } from "./AppText";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { spacing, ThemeColors, textVariants } from "@/constants/theme";

interface DisplayPillProps extends ViewProps {
  text: string;
}

export function DisplayPill({ text, style, ...rest }: DisplayPillProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.pill, style]} {...rest}>
      <AppText variant="caption" style={styles.text}>
        {text}
      </AppText>
    </View>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    pill: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: theme.primary,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      backgroundColor: "transparent",
    },
    text: {
      color: theme.primary,
      fontFamily: textVariants.button.fontFamily,
    },
  });
