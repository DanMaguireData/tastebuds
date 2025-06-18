import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground, // Import ImageBackground
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "../common/AppText";
import { Spacer } from "../layout/Spacer";
import { Recipe } from "@/types/recipe";
import { ThemeColors, spacing } from "@/constants/theme";

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // State to manage image loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const showImage = recipe.imageUrl && !hasError;

  // Reusable placeholder component for clarity
  const ImagePlaceholder = () => (
    <View style={styles.imagePlaceholder}>
      <MaterialCommunityIcons
        name="chef-hat"
        size={50}
        color="rgba(255, 255, 255, 0.8)"
      />
    </View>
  );

  return (
    // 1. Interactivity: Entire card is a single touch target with feedback
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]}
    >
      {/* 2. Image Placeholder */}
      {showImage ? (
        <ImageBackground
          source={{ uri: recipe.imageUrl }}
          style={styles.imagePlaceholder} // Use the same style for sizing
          onLoadEnd={() => setIsLoading(false)} // Stop loading indicator when done
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          resizeMode="cover" // Ensures the image covers the area nicely
        >
          {/* Show a loading spinner on top of the image while it loads */}
          {isLoading && (
            <ActivityIndicator size="large" color={theme.surface} />
          )}
        </ImageBackground>
      ) : (
        <ImagePlaceholder />
      )}
      {/* 3. Content Area with Padding */}
      <View style={styles.contentContainer}>
        {/* Recipe Title */}
        <AppText variant="h3" numberOfLines={2}>
          {recipe.title}
        </AppText>
        <Spacer size="xs" />
        {/* Recipe Description */}
        <AppText variant="body" color="textSecondary" numberOfLines={3}>
          {recipe.description}
        </AppText>
        <Spacer size="md" />
        {/* Cooking Time Chip */}
        <View style={styles.chip}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={theme.textSecondary}
          />
          <Spacer horizontal size="xs" />
          <AppText variant="caption" color="textSecondary">
            {recipe.cookTimeMinutes} min
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

// Function to create styles dynamically with the theme
const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.surface,
      borderRadius: spacing.md,
      //...theme.cardShadow,
      overflow: "hidden",
    },
    pressed: {
      transform: [{ scale: 0.98 }],
      opacity: 0.9,
    },
    imagePlaceholder: {
      height: 150,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      padding: spacing.md,
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: theme.background,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: spacing.xxl,
    },
  });
