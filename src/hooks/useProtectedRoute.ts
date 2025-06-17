import { useAuth } from "./useAuth";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // We don't want to run anything until the auth state is confirmed.
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // If the user is not signed in and they are trying to access
      // a protected route, redirect them to the login screen.
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // If the user is signed in and they are on a login/register screen,
      // redirect them to the main app screen.
      router.replace("/(tabs)/home");
    }
  }, [user, segments, isLoading, router]);
}
