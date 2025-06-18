import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors, spacing, textVariants } from "@/constants/theme";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { Container } from "@/components/layout/Container";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FloatingBackButton } from "@/components/common/FloatingBackButton";
// Mock Data
import { demoRecipes } from "@/data/recipes";

// Find the mockRecipes array. In a real app, this would be in a shared service or context.
// For now, we are re-declaring it. In a future step, we'd move this to a central place.
import { Recipe } from "@/types/recipe";
const mockRecipes: Recipe[] = demoRecipes;

export default function RecipeDetailScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { id } = useLocalSearchParams<{ id: string }>();

  // State variables for handling if image can be loaded
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Replace with fetch this data from an API: `useRecipe(id)`
  const recipe = mockRecipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <AppText variant="h2">Recipe not found!</AppText>
      </View>
    );
  }
  const showImage = recipe.imageUrl && !hasError;

  const ImagePlaceholder = () => (
    <View style={[styles.heroImage, styles.centered]}>
      <MaterialCommunityIcons
        name="chef-hat"
        size={80}
        color="rgba(255, 255, 255, 0.8)"
      />
    </View>
  );

  return (
    <>
      {/* 1. Set the dynamic header title */}
      <Stack.Screen options={{ title: recipe.title }} />

      <FloatingBackButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: theme.background }}
      >
        {/* 2. Image */}
        {showImage ? (
          <ImageBackground
            source={{ uri: recipe.imageUrl }}
            style={styles.heroImage}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            resizeMode="cover"
          >
            {/* Show a loading spinner on top of the image while it loads */}
            {isLoading && (
              <ActivityIndicator size="large" color={theme.surface} />
            )}
          </ImageBackground>
        ) : (
          <ImagePlaceholder />
        )}

        {/* 3. Padded Content Block */}
        <Container style={styles.contentContainer}>
          <AppText variant="h1">{recipe.title}</AppText>
          <Spacer size="sm" />
          <AppText variant="body" color="textSecondary">
            {recipe.description}
          </AppText>
          <Spacer size="lg" />

          {/* Utility Details */}
          <View style={styles.utilityRow}>
            <View style={styles.utilityItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={theme.textSecondary}
              />
              <Spacer horizontal size="sm" />
              <AppText variant="body" color="textSecondary">
                {recipe.cookTimeMinutes} min
              </AppText>
            </View>
            <View style={styles.utilityItem}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={20}
                color={theme.textSecondary}
              />
              <Spacer horizontal size="sm" />
              <AppText variant="body" color="textSecondary">
                {recipe.servings} servings
              </AppText>
            </View>
          </View>

          {/* Ingredients */}
          <AppText variant="h2">Ingredients</AppText>
          <View style={styles.divider} />
          {recipe.ingredients.map((ing, index) => (
            <AppText
              key={index}
              style={styles.listItem}
            >{`\u2022 ${ing.quantity} ${ing.name}`}</AppText>
          ))}
          <Spacer size="lg" />

          {/* Instructions */}
          <AppText variant="h2">Instructions</AppText>
          <View style={styles.divider} />
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <AppText
                variant="h3"
                color="primary"
                style={styles.stepNumber}
              >{`${index + 1}. `}</AppText>
              <AppText style={styles.stepText}>{step}</AppText>
            </View>
          ))}
        </Container>
      </ScrollView>
    </>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    heroImage: {
      height: 250,
      justifyContent: "flex-end",
      backgroundColor: theme.primary, // Placeholder color
    },
    contentContainer: {
      paddingTop: spacing.lg,
    },
    utilityRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: spacing.xl,
      marginBottom: spacing.lg,
    },
    utilityItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      height: 1,
      backgroundColor: theme.input.border,
      marginVertical: spacing.md,
    },
    listItem: {
      lineHeight: textVariants.body.lineHeight,
    },
    stepItem: {
      flexDirection: "row",
      marginBottom: spacing.md,
    },
    stepNumber: {
      marginRight: spacing.sm,
    },
    stepText: {
      flex: 1, // Allows text to wrap correctly
      lineHeight: textVariants.body.lineHeight,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
