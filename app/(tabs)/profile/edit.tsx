import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColors, spacing } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/common/AppText";
import { FormField } from "@/components/common/FormField";
import { SelectablePill } from "@/components/common/SelectablePill";
import { Spacer } from "@/components/layout/Spacer";
import _isEqual from "lodash/isEqual"; // A reliable way to compare arrays/objects

const DIETARY_OPTIONS = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Dairy-Free",
  "Low-Carb",
  "Nut-Free",
];

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { user, updateUserProfile } = useAuth();

  const [initialName, setInitialName] = useState("");
  const [initialPrefs, setInitialPrefs] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const currentName = user.name || "";
      const currentPrefs = user.dietaryPreferences || [];
      setName(currentName);
      setPreferences(currentPrefs);
      setInitialName(currentName);
      setInitialPrefs(currentPrefs);
    }
  }, [user]);

  const isDirty = useMemo(() => {
    return (
      name !== initialName || !_isEqual(preferences.sort(), initialPrefs.sort())
    );
  }, [name, preferences, initialName, initialPrefs]);

  const togglePreference = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
    );
  };

  const handleSave = async () => {
    if (!isDirty || isSaving) return;
    setIsSaving(true);
    try {
      await updateUserProfile({ name, dietaryPreferences: preferences });
      router.back();
    } catch (error) {
      Alert.alert(
        "Save Failed",
        "Could not update your profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to discard them?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
        ],
      );
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <AppText variant="body" color="textSecondary">
            Cancel
          </AppText>
        </TouchableOpacity>
        <AppText variant="h3">Edit Profile</AppText>
        <TouchableOpacity onPress={handleSave} disabled={!isDirty || isSaving}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isSaving && (
              <ActivityIndicator
                size="small"
                color={theme.primary}
                style={{ marginRight: spacing.xs }}
              />
            )}
            <AppText
              variant="button"
              style={{
                color:
                  !isDirty || isSaving ? theme.textSecondary : theme.primary,
              }}
            >
              Save
            </AppText>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <FormField
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <Spacer size="lg" />
        <AppText variant="h3">Dietary Preferences</AppText>
        <Spacer size="md" />
        <View style={styles.pillsContainer}>
          {DIETARY_OPTIONS.map((opt) => (
            <SelectablePill
              key={opt}
              text={opt}
              isSelected={preferences.includes(opt)}
              onPress={() => togglePreference(opt)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    modalContainer: { flex: 1, backgroundColor: theme.background },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.input.border,
    },
    content: { padding: spacing.lg },
    pillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
