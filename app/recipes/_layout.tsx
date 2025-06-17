import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function RecipeStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: theme.background,
        // },
        // headerTintColor: theme.primary,
        // headerTitleStyle: {
        //   color: theme.textPrimary,
        // },
        // headerBackButtonMenuEnabled: false
        headerShown: false,
        navigationBarHidden: true,
      }}
    />
  );
}
