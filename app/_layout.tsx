import { Stack, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
//Contexts
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Fonts
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import "@/config/firebase";

interface ConnectionStatus {
  isConnected: boolean | null;
  isLoading: boolean;
  error?: string;
}

function RootLayoutNav() {
  // This hook will now handle all auth-based navigation!
  useProtectedRoute();

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="recipes" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  // Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      try {
        console.log("Checking firebase connection...");
      } catch (error) {
        console.log("Firebase connection test failed:", error);
      }
      // Hide the splash screen once fonts are loaded or if there's an error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If theres an erro in loading the fonts
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
