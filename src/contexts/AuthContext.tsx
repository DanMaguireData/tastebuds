import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebase"; // Your initialized Firebase auth service

interface AuthContextType {
  user: User | null; // The Firebase User object or null if not logged in
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // When the listener fires, we update our state
      setUser(firebaseUser);

      // We are no longer loading, as we have our initial answer
      setIsLoading(false);
    });

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
