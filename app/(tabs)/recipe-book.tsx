import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { RecipeList } from "@/components/recipes/RecipeList";
import { Recipe } from "@/types/recipe";
import { Spacer } from "@/components/layout/Spacer";
import { useCallback, useEffect, useState, useMemo } from "react";

export default function RecipeBook() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mockRecipes: Recipe[] = useMemo(
    () => [
      {
        id: "1",
        title: "Classic Chicken Tikka Masala",
        description:
          "A rich and creamy curry with tender, marinated chicken pieces.",
        cookingTime: 45,
        imageUrl:
          "https://www.recipetineats.com/tachyon/2018/04/Chicken-Tikka-Masala_0.jpg?resize=964%2C1350&zoom=0.67",
      },
      {
        id: "2",
        title: "One-Pan Lemon Herb Roasted Salmon & Asparagus",
        description:
          "A healthy and incredibly fast weeknight dinner that cleans up in a flash.",
        cookingTime: 20,
      },
      {
        id: "3",
        title: "Ultimate Fudgy Chocolate Brownies",
        description:
          "The perfect brownie: dense, chewy, and loaded with chocolate flavor.",
        cookingTime: 60,
      },
    ],
    [],
  );

  // Simulate fetching data from an API
  const fetchRecipes = useCallback(async () => {
    console.log("Fetching recipes...");
    return new Promise<Recipe[]>((resolve) => {
      setTimeout(() => {
        // To test the empty state, change `mockRecipes` to `[]`
        resolve(mockRecipes);
      }, 2000); // 2-second delay to see the loading skeleton
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
    <Container>
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
  );
}
