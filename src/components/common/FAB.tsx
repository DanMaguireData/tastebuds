// React
import React from "react";
// Components
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { ThemeColors, spacing } from "@/constants/theme";

export function FAB({ onPress, ...rest }: TouchableOpacityProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Create new recipe"
      {...rest}
    >
      <MaterialCommunityIcons name="plus" size={32} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: spacing.lg,
      right: spacing.lg,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8, // A bit more elevation for FABs on Android
      zIndex: 10, // Ensure it floats above other content like FlatLists
    },
  });
