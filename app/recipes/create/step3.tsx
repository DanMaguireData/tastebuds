// Components
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { AppButton } from "@/components/common/AppButton";
import { Spacer } from "@/components/layout/Spacer";
import { AppText } from "@/components/common/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressStepper } from "@/components/recipes/ProgressStepper";
// Hooks
import { useRouter } from "expo-router";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
// Services
import { createRecipe } from "@/services/recipeService";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// React
import React, { useState } from "react";
// Theme
import { ThemeColors, spacing, textVariants } from "@/constants/theme";

export default function Step3() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { instructions, setInstructions, ...recipeData } = useCreateRecipe();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const addInstruction = () =>
    setInstructions([...instructions, { id: uuidv4(), text: "" }]);
  const updateInstruction = (id: string, text: string) => {
    setInstructions(
      instructions.map((inst) => (inst.id === id ? { ...inst, text } : inst)),
    );
  };

  const handleSave = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to save a recipe.");
      return;
    }
    setIsSaving(true);
    try {
      const finalRecipe = {
        title: recipeData.title,
        description: recipeData.description,
        servings: Number(recipeData.servings),
        prepTimeMinutes: Number(recipeData.prepTime),
        cookTimeMinutes: Number(recipeData.cookTime),
        ingredients: recipeData.ingredients.map(({ id, ...rest }) => rest), // Remove temporary id
        instructions: instructions.map((inst) => inst.text),
        ownerId: user.uid,
        tags: [], // Add logic for these later
        ingredientNames: recipeData.ingredients.map((i) =>
          i.name.toLowerCase(),
        ),
        isFavorite: false,
        isPublic: false,
        _v: 1,
      };
      await createRecipe(finalRecipe);
      router.replace("/(tabs)/home"); // Or to the new recipe detail page
    } catch (error) {
      Alert.alert(
        "Save Failed",
        "Could not save your recipe. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProgressStepper currentStep={3} />
      <View style={styles.container}>
        <DraggableFlatList
          data={instructions}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setInstructions(data)}
          renderItem={({ item, drag, isActive }) => (
            <ScaleDecorator>
              <View
                style={[
                  styles.row,
                  {
                    backgroundColor: isActive
                      ? theme.surface
                      : theme.background,
                  },
                ]}
              >
                <TouchableOpacity onLongPress={drag}>
                  <MaterialCommunityIcons
                    name="drag-horizontal-variant"
                    size={24}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
                <AppText style={{ marginHorizontal: 8 }}>{item.id}.</AppText>
                <TextInput
                  style={styles.textInput}
                  value={item.text}
                  onChangeText={(text) => updateInstruction(item.id, text)}
                  multiline
                  placeholder="Describe this step..."
                />
              </View>
            </ScaleDecorator>
          )}
        />
        <AppButton
          title="+ Add Step"
          onPress={addInstruction}
          variant="outline"
        />
        <View style={styles.navButtons}>
          <AppButton
            title="Back"
            onPress={() => router.back()}
            variant="secondary"
            style={{ flex: 1 }}
          />
          <Spacer horizontal size="md" />
          <AppButton
            title={isSaving ? "" : "Save Recipe"}
            onPress={handleSave}
            disabled={instructions.length === 0 || isSaving}
            style={{ flex: 1 }}
          >
            {isSaving && <ActivityIndicator color="#FFFFFF" />}
          </AppButton>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

// Add this to the end of app/(create)/step3.tsx

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: spacing.lg,
    },
    // The container for each instruction row in the draggable list
    row: {
      flexDirection: "row",
      alignItems: "flex-start", // Use flex-start for multi-line text alignment
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.input.border,
    },
    // The main text input for the instruction
    textInput: {
      flex: 1,
      color: theme.textPrimary,
      fontFamily: textVariants.body.fontFamily,
      fontSize: textVariants.body.fontSize,
      lineHeight: textVariants.body.lineHeight,
      // No fixed height allows it to grow with content
    },
    // The drag handle icon
    dragHandle: {
      paddingRight: spacing.sm,
      paddingTop: 2, // Minor adjustment to align with text
    },
    // Step number text
    stepNumber: {
      marginHorizontal: spacing.sm,
      fontFamily: textVariants.button.fontFamily,
      color: theme.textSecondary,
      paddingTop: 2, // Minor adjustment
    },
    // Navigation buttons at the bottom
    navButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: spacing.md,
      marginTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.input.border,
    },
  });
