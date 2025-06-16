import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { FlatList } from "react-native";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/recipe";
import { Spacer } from "@/components/layout/Spacer";

export default function RecipeBook() {
  const handleRecipePress = (recipe: Recipe) => {
    console.log("Pressed recipe:", recipe.title);
    // Later, this will navigate to the recipe detail screen, e.g., router.push(`/recipes/${recipe.id}`)
  };

  const mockRecipes: Recipe[] = [
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
  ];

  return (
    <Container edges={["bottom", "left", "right"]}>
      <AppText variant="h1" color="primary">
        Recipe Book
      </AppText>
      <Spacer size="xl" />
      <FlatList
        data={mockRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />
        )}
        ItemSeparatorComponent={() => <Spacer size="lg" />}
        ListFooterComponent={() => <Spacer size="lg" />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
