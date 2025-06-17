import { Recipe } from "../types/recipe";

export const demoRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Chicken Tikka Masala",
    description:
      "A rich and creamy curry with tender, marinated chicken pieces.",
    cookingTime: 45,
    imageUrl:
      "https://www.recipetineats.com/tachyon/2018/04/Chicken-Tikka-Masala_0.jpg?resize=964%2C1350&zoom=0.67",
    servings: 4,
    ingredients: [
      { name: "Chicken Breast", quantity: "500g" },
      { name: "Yogurt", quantity: "1 cup" },
      { name: "Tomato Puree", quantity: "400g" },
      { name: "Garam Masala", quantity: "2 tsp" },
    ],
    instructions: [
      "Marinate the chicken in yogurt and spices for at least 1 hour.",
      "Cook the chicken in a hot pan until browned on all sides.",
      "Add tomato puree and simmer until the sauce thickens.",
      "Stir in cream and serve hot with naan or rice.",
    ],
  },
  {
    id: "2",
    title: "One-Pan Lemon Herb Roasted Salmon & Asparagus",
    description:
      "A healthy and incredibly fast weeknight dinner that cleans up in a flash.",
    cookingTime: 20,
    servings: 2,
    ingredients: [
      { name: "Salmon Fillets", quantity: "2 (6 oz each)" },
      { name: "Asparagus Spears", quantity: "1 bunch (trimmed)" },
      { name: "Lemon", quantity: "1 (sliced)" },
      { name: "Olive Oil", quantity: "2 tbsp" },
      { name: "Dried Dill", quantity: "1 tsp" },
      { name: "Garlic Powder", quantity: "1/2 tsp" },
      { name: "Salt", quantity: "to taste" },
      { name: "Black Pepper", quantity: "to taste" },
    ],
    instructions: [
      "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper.",
      "On the baking sheet, toss asparagus with 1 tbsp olive oil, salt, and pepper.",
      "Place salmon fillets on the same baking sheet. Drizzle with remaining olive oil, sprinkle with dill and garlic powder, and season with salt and pepper.",
      "Arrange lemon slices over and around the salmon and asparagus.",
      "Bake for 12-15 minutes, or until salmon is cooked through and flakes easily with a fork.",
      "Serve immediately.",
    ],
  },
  {
    id: "3",
    title: "Ultimate Fudgy Chocolate Brownies",
    description:
      "The perfect brownie: dense, chewy, and loaded with chocolate flavor.",
    cookingTime: 60,
    servings: 16,
    ingredients: [
      { name: "Unsalted Butter", quantity: "1 cup (2 sticks), melted" },
      { name: "Granulated Sugar", quantity: "1 cup" },
      { name: "Brown Sugar (packed)", quantity: "1 cup" },
      { name: "Large Eggs", quantity: "4" },
      { name: "Vanilla Extract", quantity: "1 tsp" },
      { name: "All-Purpose Flour", quantity: "1 cup" },
      { name: "Unsweetened Cocoa Powder", quantity: "¾ cup" },
      { name: "Salt", quantity: "½ tsp" },
      { name: "Chocolate Chips", quantity: "1 cup (optional)" },
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour a 9x13 inch baking pan.",
      "In a large bowl, whisk together melted butter, granulated sugar, and brown sugar until smooth.",
      "Beat in eggs one at a time, then stir in vanilla extract.",
      "In a separate bowl, whisk together flour, cocoa powder, and salt. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. Fold in chocolate chips if using.",
      "Pour batter into the prepared baking pan and spread evenly.",
      "Bake for 25-30 minutes, or until a toothpick inserted into the center comes out with moist crumbs (not wet batter). Do not overbake.",
      "Let cool completely in the pan on a wire rack before cutting into squares. Enjoy!",
    ],
  },
];
