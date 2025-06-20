import React, { createContext, useState, useContext, ReactNode } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import { Ingredient } from "@/types/recipe";

interface CreateRecipeContextType {
  // Step 1
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  image: ImagePickerAsset | null;
  setImage: (asset: ImagePickerAsset | null) => void;
  servings: string;
  setServings: (s: string) => void;
  prepTime: string;
  setPrepTime: (t: string) => void;
  cookTime: string;
  setCookTime: (t: string) => void;

  // Step 2
  ingredients: (Ingredient & { id: string })[];
  setIngredients: (ingredients: (Ingredient & { id: string })[]) => void;

  // Step 3
  instructions: { id: string; text: string }[];
  setInstructions: (instructions: { id: string; text: string }[]) => void;
}

export const CreateRecipeContext = createContext<
  CreateRecipeContextType | undefined
>(undefined);

export function CreateRecipeProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [servings, setServings] = useState("4");
  const [prepTime, setPrepTime] = useState("15");
  const [cookTime, setCookTime] = useState("45");
  const [ingredients, setIngredients] = useState<
    (Ingredient & { id: string })[]
  >([]);
  const [instructions, setInstructions] = useState<
    { id: string; text: string }[]
  >([]);

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    servings,
    setServings,
    prepTime,
    setPrepTime,
    cookTime,
    setCookTime,
    ingredients,
    setIngredients,
    instructions,
    setInstructions,
  };

  return (
    <CreateRecipeContext.Provider value={value}>
      {children}
    </CreateRecipeContext.Provider>
  );
}
