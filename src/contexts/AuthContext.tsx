import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import { auth } from "@/config/firebase";
import { UserProfile } from "@/types/user";
import { getUserProfile } from "@/services/userService";

interface AuthContextType {
  user: UserProfile | null; // The Firebase User object or null if not logged in
  isLoading: boolean; // True while checking the initial auth state
}

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseAuthUser | null) => {
        if (firebaseUser) {
          // User is signed in. Fetch their profile from Firestore.
          try {
            const userProfile = await getUserProfile(firebaseUser.uid);
            if (userProfile) {
              setUser(userProfile);
            } else {
              // This case might happen if profile creation failed.
              // You could attempt to re-create it or handle as an error.
              console.error(
                "User is authenticated, but no profile found in Firestore.",
              );
              setUser(null); // Treat as logged out if profile is missing
            }
          } catch (error) {
            console.error(
              "Failed to fetch user profile during auth state change:",
              error,
            );
            setUser(null);
          }
        } else {
          // User is signed out.
          setUser(null);
        }
        setIsLoading(false);
      },
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isLoading,
  };

  // While loading, we can render nothing or a splash screen/loader.
  // By rendering children only when not loading, we prevent UI flicker.
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
