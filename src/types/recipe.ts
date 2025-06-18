import { Timestamp } from "firebase/firestore";

export interface Recipe {
  // --- Core Details ---
  title: string;
  description: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;

  // --- Ingredients ---
  ingredients: Ingredient[];
  // --- Image ---
  imageUrl?: string; // Optional for now
  // --- Instructions ---
  instructions: string[];

  // --- Ownership & Metadata ---
  ownerId: string; // The user's ID. CRITICAL for security rules.
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // --- Search Features ---
  tags: string[];
  ingredientNames: string[]; // Denormlaised List of ingredients

  // --- User Personalization ---
  rating?: number; // User's personal rating (e.g., 1-5). Optional.
  notes?: string; // User's personal notes on the recipe.
  isFavorite: boolean; // Simple flag for a user's favorite recipes list. Defaults to false.

  // --- Future-Proofing & Community Features ---
  isPublic: boolean; // Defaults to false. Controls visibility in a future public feed.

  // If this recipe is a variant of another, we store the original's ID.
  derivedFrom?: string; // recipeId of the original recipe

  // To handle future schema refinements
  _v: 1;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;

  // Normalised Quantities to make conversions easier
  // down the line
  normalizedQuantity?: number; // e.g., 120
  normalizedUnit?: string; // e.g., "g"
}
