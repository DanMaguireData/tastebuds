// React
import { Stack, useRouter } from "expo-router";
// Context
import { CreateRecipeProvider } from "@/contexts/CreateRecipeContext";
// Components
import { TouchableOpacity } from "react-native";
import { AppText } from "@/components/common/AppText";
// Hooks
import { useTheme } from "@/hooks/useTheme";

// This is the main layout for the recipe creation wizard.
// It wraps all steps in the CreateRecipeProvider so they share state.
export default function CreateRecipeLayout() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <CreateRecipeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.textPrimary },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AppText color="textSecondary">Cancel</AppText>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="step1"
          options={{ title: "Step 1 of 3: Details" }}
        />
        <Stack.Screen
          name="step2"
          options={{ title: "Step 2 of 3: Ingredients" }}
        />
        <Stack.Screen
          name="step3"
          options={{ title: "Step 3 of 3: Instructions" }}
        />
      </Stack>
    </CreateRecipeProvider>
  );
}
