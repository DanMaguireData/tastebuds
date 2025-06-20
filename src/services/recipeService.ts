import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Recipe } from "@/types/recipe";

/**
 * Creates a new recipe document in the 'recipes' collection in Firestore.
 * @param recipeData The complete recipe object, minus server-generated fields.
 * @returns The ID of the newly created document.
 */
export const createRecipe = async (
  recipeData: Omit<Recipe, "createdAt" | "updatedAt">,
) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), {
      ...recipeData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Recipe created successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw new Error("Failed to save recipe.");
  }
};
