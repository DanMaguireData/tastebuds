// React
import { Stack, useRouter } from "expo-router";
// Context
import { CreateRecipeProvider } from "@/contexts/CreateRecipeContext";
// Components
import { TouchableOpacity, Alert } from "react-native";
import { AppText } from "@/components/common/AppText";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { spacing } from "@/constants/theme";

// This is the main layout for the recipe creation wizard.
// It wraps all steps in the CreateRecipeProvider so they share state.
export default function CreateRecipeLayout() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleCancelPress = () => {
    Alert.alert(
      "Discard Recipe?", // Title
      "Are you sure you want to exit? All progress will be lost.", // Message
      [
        // Button Array
        {
          text: "Keep Editing",
          onPress: () => console.log("User canceled the discard action."),
          style: "cancel", // The "cancel" style is important for behavior on iOS and Android
        },
        {
          text: "Discard",
          onPress: () => router.push("/(tabs)/recipe-book"), // Only navigate back if the user confirms
          style: "destructive", // This styles the button appropriately (e.g., red text on iOS)
        },
      ],
    );
  };

  return (
    <CreateRecipeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.textPrimary },
          headerLeft: () => (
            <TouchableOpacity onPress={handleCancelPress}>
              <AppText color="textSecondary">Cancel</AppText>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="step1"
          options={{
            title: "Details",
          }}
        />
        <Stack.Screen name="step2" options={{ title: "Ingredients" }} />
        <Stack.Screen name="step3" options={{ title: "Instructions" }} />
      </Stack>
    </CreateRecipeProvider>
  );
}
