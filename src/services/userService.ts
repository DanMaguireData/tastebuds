import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/user";

/**
 * Creates a new user profile document in the 'users' collection in Firestore.
 * This is typically called immediately after a user successfully registers.
 * @param user The user object from Firebase Authentication's createUserWithEmailAndPassword.
 */
export const createUserProfileDocument = async (user: User) => {
  if (!user) return;

  // Create a reference to the document with the user's UID as the ID
  const userRef = doc(db, "users", user.uid);

  // The data we want to store
  const userData = {
    uid: user.uid,
    email: user.email,
    name: user.displayName || "", // Can be empty initially
    dietaryPreferences: [],
    createdAt: serverTimestamp(), // Let Firestore handle the timestamp
  };

  try {
    // setDoc will create the document if it doesn't exist.
    await setDoc(userRef, userData);
    console.log(
      "User profile document created successfully for UID:",
      user.uid,
    );
  } catch (error) {
    console.error("Error creating user profile document:", error);
    // You might want to throw the error to handle it in the UI
    throw new Error("Failed to create user profile.");
  }
};

/**
 * Fetches a user's profile document from Firestore.
 * @param uid The user's unique ID.
 * @returns The user's profile data or null if not found.
 */
export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  if (!uid) return null;

  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // The document exists, return its data
      return docSnap.data() as UserProfile;
    } else {
      // The document does not exist
      console.warn("No user profile document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
};

/**
 * Updates a user's profile document in Firestore.
 * @param uid The user's unique ID.
 * @param data An object containing the fields to update.
 */
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>,
) => {
  if (!uid) return;

  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
    console.log("User profile updated successfully for UID:", uid);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile.");
  }
};
