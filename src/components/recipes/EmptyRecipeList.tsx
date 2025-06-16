import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "@/components/common//AppText";
import { AppButton } from "@/components/common/AppButton";
import { Spacer } from "../layout/Spacer";
import { spacing } from "@/constants/theme";

export function EmptyState() {
  const { theme } = useTheme();

  const handleCreateRecipe = () => {
    // This should navigate to your AI recipe generation screen
    console.log("Navigating to create recipe screen...");
    // router.push('/create'); // Example path
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="book-open-variant"
        size={80}
        color={theme.textSecondary}
      />
      <Spacer size="lg" />
      <AppText variant="h2" style={styles.textAlign}>
        Your Cookbook is Empty
      </AppText>
      <Spacer size="sm" />
      <AppText variant="body" color="textSecondary" style={styles.textAlign}>
        {`Let's find your next favorite meal. Tap below to create your first
        recipe with AI.`}
      </AppText>
      <Spacer size="xl" />
      <AppButton title="Create First Recipe" onPress={handleCreateRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  textAlign: {
    textAlign: "center",
  },
});
