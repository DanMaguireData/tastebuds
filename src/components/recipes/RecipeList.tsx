// React
import React from "react";
// Components
import { FlatList, View, RefreshControl } from "react-native";
import { RecipeCard } from "./RecipeCard";
import { RecipeCardSkeleton } from "./RecipeCardSkeleton";
import { EmptyState } from "./EmptyRecipeList";
import { Spacer } from "../layout/Spacer";
// Types
import { Recipe } from "@/types/recipe";
// Hooks
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
// Theme
import { spacing } from "@/constants/theme";

interface RecipeListProps {
  recipes: Recipe[];
  isLoading: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export function RecipeList({
  recipes,
  isLoading,
  onRefresh,
  isRefreshing,
  ListHeaderComponent,
}: RecipeListProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const handleRecipePress = (recipe: Recipe) => {
    console.log("Pressed recipe:", recipe.title);
    router.push(`/recipes/${recipe.id}`);
  };

  const renderHeader = () => {
    // If ListHeaderComponent is a function/class (a definition), render it as a component.
    if (typeof ListHeaderComponent === "function") {
      const Header = ListHeaderComponent;
      return <Header />;
    }
    // Otherwise, assume it's a pre-rendered element or null.
    return ListHeaderComponent;
  };

  if (isLoading) {
    return (
      <View style={{ paddingHorizontal: spacing.md }}>
        {renderHeader()}
        <RecipeCardSkeleton />
        <Spacer size="lg" />
        <RecipeCardSkeleton />
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={<EmptyState />}
      ItemSeparatorComponent={() => <Spacer size="lg" />}
      ListFooterComponent={() => <Spacer size="lg" />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={theme.primary} // For iOS
          colors={[theme.primary]} // For Android
        />
      }
    />
  );
}
