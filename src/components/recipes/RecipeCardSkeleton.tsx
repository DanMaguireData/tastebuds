import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors, spacing } from "@/constants/theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const ShimmeringView = ({ style }: { style: any }) => {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-200, 200]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[style, { backgroundColor: theme.skeleton, overflow: "hidden" }]}
    >
      <Animated.View
        style={[
          { width: "100%", height: "100%", position: "absolute" },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.1)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </View>
  );
};

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
