// React
import { Stack } from "expo-router";
// Hooks
import { useTheme } from "@/hooks/useTheme";

export default function RecipeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Screen for displayoing recipe */}
      <Stack.Screen name="[id]" />

      {/** Screen stack for creating recipe */}
      <Stack.Screen
        name="create"
        //options={{ presentation: 'modal'}}
      />
    </Stack>
  );
}
