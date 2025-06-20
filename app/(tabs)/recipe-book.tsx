// Components
import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { RecipeList } from "@/components/recipes/RecipeList";
import { Recipe } from "@/types/recipe";
import { Spacer } from "@/components/layout/Spacer";
import { FAB } from "@/components/common/FAB";
import { View } from "react-native";
// React
import { useCallback, useEffect, useState, useMemo } from "react";
// Hooks
import { useRouter } from "expo-router";
// Mock Data
import { demoRecipes } from "@/data/recipes";

export default function RecipeBook() {
  //State
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Router
  const router = useRouter();

  const mockRecipes: Recipe[] = useMemo(() => demoRecipes, []);

  // Simulate fetching data from an API
  const fetchRecipes = useCallback(async () => {
    console.log("Fetching recipes...");
    return new Promise<Recipe[]>((resolve) => {
      setTimeout(() => {
        // To test the empty state, change `mockRecipes` to `[]`
        resolve(mockRecipes);
      }, 500); // 500ms delay to see the loading skeleton
    });
  }, [mockRecipes]);

  useEffect(() => {
    // Get intial list of recipes
    const runInitialLoad = () => {
      setIsLoading(true);
      fetchRecipes()
        .then(setRecipes)
        .finally(() => setIsLoading(false));
    };
    runInitialLoad();
  }, [fetchRecipes]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchRecipes()
      .then(setRecipes)
      .finally(() => setIsRefreshing(false));
  }, [fetchRecipes]);

  return (
    <View style={{ flex: 1 }}>
      <Container edges={["top", "left", "right"]}>
        <Spacer size="lg" />
        <AppText variant="h1" color="primary">
          Recipe Book
        </AppText>
        <Spacer size="xl" />
        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      </Container>
      <FAB onPress={() => router.push("/recipes/create/step1")} />
    </View>
  );
}
