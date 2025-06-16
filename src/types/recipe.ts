export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number; // in minutes
  imageUrl?: string; // Optional for now
}
