// React
import { Stack, useRouter, useSegments } from "expo-router";
// Context
import { CreateRecipeProvider } from "@/contexts/CreateRecipeContext";
// Components
import { TouchableOpacity, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { ProgressStepper } from "@/components/recipes/ProgressStepper";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { spacing } from "@/constants/theme";

// This is the main layout for the recipe creation wizard.
// It wraps all steps in the CreateRecipeProvider so they share state.
export default function CreateRecipeLayout() {
  const router = useRouter();
  const { theme } = useTheme();

  // useSegments() gives us the current route parts, e.g., ['(create)', 'step1']
  const segments = useSegments();

  // Determine the current step number from the route segment
  const currentStep = parseInt(
    segments[segments.length - 1]?.replace("step", "") || "1",
  );

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
          //   header: ({ options }) => (
          //     <View style={{ backgroundColor: theme.surface }}>
          //       {/* This is the standard header part */}
          //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, backgroundColor: theme.background }}>
          //         <AppText variant='h3'>{options.title}</AppText>
          //         {/* We reserve space for a right button, even if empty, for alignment */}
          //         <View style={{ width: 60 }}></View>
          //       </View>
          //       {/* Our new stepper component rendered below */}
          //       <ProgressStepper currentStep={currentStep} />
          //     </View>
          //   ),
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
