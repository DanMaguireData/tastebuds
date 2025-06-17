import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase"; // Your initialized Firestore instance
import { User } from "firebase/auth"; // The user type from Firebase Auth

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
