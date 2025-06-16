import { Stack, SplashScreen } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";

// Fonts
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

export default function RootLayout() {
  // Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded or if there's an error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If theres an erro in loading the fonts
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
