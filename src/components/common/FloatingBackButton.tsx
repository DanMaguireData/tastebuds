import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export function FloatingBackButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const buttonStyle = {
    top: insets.top + spacing.sm, // Position below the status bar with a small margin
    left: insets.left + spacing.sm,
  };

  return (
    <Pressable
      onPress={() => {
        console.log("Back Clicked");
        router.back();
      }}
      style={[styles.container, buttonStyle]}
    >
      <MaterialCommunityIcons name="chevron-left" size={30} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // Ensure it's on top of other content
  },
});
