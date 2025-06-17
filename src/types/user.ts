import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string; // Should match the Firebase Auth UID
  email: string;
  name?: string; // Optional, can be set later in a profile settings screen
  dietaryPreferences?: string[]; // e.g., ['vegan', 'gluten-free']
  createdAt: Timestamp; // To know when the user joined
}
