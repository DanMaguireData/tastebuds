import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

/**
 * Hook to access the current authentication context.
 * Provides the authenticated user and loading state.
 *
 * @returns The authentication context.
 * @throws Error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
