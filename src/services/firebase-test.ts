import { auth, db } from "@/config/firebase";

export const testFirebaseConnection = () => {
  console.log("Firebase Auth:", auth);
  console.log("Firebase Firestore:", db);
  console.log("Firebase connection successful!");
};
