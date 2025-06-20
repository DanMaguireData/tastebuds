// Components
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { IngredientInput } from "@/components/common/IngredientInput";
import { AppButton } from "@/components/common/AppButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { UnitSelectorModal } from "@/components/recipes/UnitSelectorModal";
import { ProgressStepper } from "@/components/recipes/ProgressStepper";
// React
import React, { useRef, useState } from "react";
// Hooks
import { useRouter } from "expo-router";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import { useTheme } from "@/hooks/useTheme";
// Services
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
// Theme
import { ThemeColors, spacing } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Types
import { Ingredient } from "@/src/types/recipe";
// Constants
import { UNITS, UnitKey } from "@/constants/unit";

export default function Step2() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { ingredients, setIngredients } = useCreateRecipe();

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: uuidv4(), name: "", quantity: 0, unit: "" },
    ]);
  };
  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };
  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing,
      ),
    );
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  // Keep track of which ingredient row is currently being edited
  const [editingIngredientId, setEditingIngredientId] = useState<string | null>(
    null,
  );

  const openUnitSelector = (ingredientId: string) => {
    setEditingIngredientId(ingredientId);
    console.log("Opening Modal", bottomSheetRef.current);
    bottomSheetRef.current?.expand();
    console.log("Opening Modal", bottomSheetRef.current);
  };

  const handleSelectUnit = (unitKey: UnitKey) => {
    if (editingIngredientId) {
      updateIngredient(editingIngredientId, "unit", unitKey);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.fullScreenContainer}>
        <ProgressStepper currentStep={2} />
        <View style={styles.contentContainer}>
          <ScrollView>
            {/* --- 1. Add Column Headers --- */}
            <View style={styles.headerRow}>
              <AppText
                variant="caption"
                color="textSecondary"
                style={styles.headerQty}
              >
                Qty
              </AppText>
              <AppText
                variant="caption"
                color="textSecondary"
                style={styles.headerUnit}
              >
                Unit
              </AppText>
              <AppText
                variant="caption"
                color="textSecondary"
                style={styles.headerName}
              >
                Name
              </AppText>
            </View>

            {/* --- 2. Map over ingredients and use the new layout --- */}
            {ingredients.map((ing) => (
              <View key={ing.id} style={styles.row}>
                <IngredientInput
                  containerStyle={styles.inputQty}
                  placeholder="1"
                  value={String(ing.quantity)}
                  onChangeText={(val) =>
                    updateIngredient(ing.id, "quantity", Number(val) || 0)
                  }
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    { borderColor: theme.input.border },
                  ]}
                  onPress={() => openUnitSelector(ing.id)}
                >
                  <AppText color="textPrimary">
                    {ing.unit
                      ? UNITS[ing.unit as UnitKey]?.abbreviation || "Unit"
                      : "Unit"}
                  </AppText>
                </TouchableOpacity>
                <IngredientInput
                  containerStyle={styles.inputName}
                  placeholder="Flour"
                  value={ing.name}
                  onChangeText={(val) => updateIngredient(ing.id, "name", val)}
                  style={{ textAlign: "left", paddingHorizontal: spacing.md }} // Override center align for this field
                />
                <TouchableOpacity
                  onPress={() => removeIngredient(ing.id)}
                  style={styles.removeButton}
                >
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color={theme.error}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <Spacer size="md" />
            <AppButton
              title="+ Add Ingredient"
              onPress={addIngredient}
              variant="outline"
            />
          </ScrollView>
          <View style={styles.navButtons}>
            <AppButton
              title="Back"
              onPress={() => router.back()}
              variant="secondary"
              style={{ flex: 1 }}
            />
            <Spacer horizontal size="md" />
            <AppButton
              title="Next: Instructions"
              onPress={() => router.push("/recipes/create/step3")}
              disabled={ingredients.length === 0}
              style={{ flex: 1 }}
            />
          </View>
        </View>
        <UnitSelectorModal
          // Pass the ref using the actual 'ref' prop
          ref={bottomSheetRef}
          // The custom 'bottomSheetRef' prop is removed
          onSelectUnit={handleSelectUnit}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    fullScreenContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      flex: 1,
      padding: spacing.lg,
    },
    headerQty: { flex: 2, textAlign: "center" },
    headerUnit: { flex: 3, textAlign: "center" },
    headerName: { flex: 5, paddingLeft: spacing.md },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    inputQty: { flex: 2, marginRight: spacing.sm },
    inputUnit: { flex: 3, marginRight: spacing.sm },
    inputName: { flex: 5 },
    removeButton: {
      paddingLeft: spacing.sm,
    },
    navButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.input.border,
    },

    headerRow: {
      flexDirection: "row",
      marginBottom: spacing.xs,
    },
    unitButton: {
      flex: 3,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: spacing.sm,
      borderWidth: 1.5,
      marginRight: spacing.sm,
    },
  });
