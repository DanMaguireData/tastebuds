import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors, spacing } from "@/constants/theme";
import { ShimmeringView } from "../common/ShimmeringView";

export function RecipeCardSkeleton() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.cardContainer}>
      <ShimmeringView style={styles.imagePlaceholder} />
      <View style={styles.contentContainer}>
        <ShimmeringView style={styles.titleBar} />
        <ShimmeringView style={styles.descriptionBar1} />
        <ShimmeringView style={styles.descriptionBar2} />
        <ShimmeringView style={styles.chip} />
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.surface,
      borderRadius: spacing.md,
      overflow: "hidden",
    },
    imagePlaceholder: { height: 150 },
    contentContainer: { padding: spacing.md },
    titleBar: {
      height: spacing.lg,
      width: "70%",
      borderRadius: spacing.xs,
      marginBottom: spacing.sm,
    },
    descriptionBar1: {
      height: spacing.md,
      width: "90%",
      borderRadius: spacing.xs,
      marginBottom: spacing.xs,
    },
    descriptionBar2: {
      height: spacing.md,
      width: "60%",
      borderRadius: spacing.xs,
      marginBottom: spacing.md,
    },
    chip: { height: 28, width: 90, borderRadius: spacing.xxl },
  });
