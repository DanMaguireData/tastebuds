import { useContext } from "react";
import { CreateRecipeContext } from "@/contexts/CreateRecipeContext";

/**
 * Hook to access the recipe user is currently creating
 *
 * @returns Theme context containing deatils of the recipe suer is creating
 * @throws Error if used outside of CreateRecipeProvider
 */
export function useCreateRecipe() {
  const context = useContext(CreateRecipeContext);
  if (context === undefined) {
    throw new Error(
      "useCreateRecipe must be used within a CreateRecipeProvider",
    );
  }
  return context;
}
