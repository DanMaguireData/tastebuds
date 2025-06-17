import { Stack, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
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
// Firebase Test
import { testFirebaseConnection } from "@/services/firebase-test";

interface ConnectionStatus {
  isConnected: boolean | null;
  isLoading: boolean;
  error?: string;
}

export default function RootLayout() {
  // Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: null,
    isLoading: true,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      try {
        console.log("Checking firebase connection...");
        testFirebaseConnection();
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
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="recipes" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
