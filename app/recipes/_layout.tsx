import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function RecipeStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
