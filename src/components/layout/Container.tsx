import React from "react";
import { View, StyleSheet, ViewStyle, ScrollView } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/constants/theme";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle; // Allow custom styles to be passed
  scrollable?: boolean; // Option to make the container scrollable
  disableHorizontalPadding?: boolean; // Option to remove horizontal padding for full-width elements
   edges?: readonly Edge[]
}

export function Container({
  children,
  style,
  scrollable = false,
  disableHorizontalPadding = false,
  edges,
}: ContainerProps) {
  const { theme } = useTheme();

  // Determine horizontal padding based on prop
  const horizontalPaddingStyle = disableHorizontalPadding
    ? null
    : { paddingHorizontal: spacing.md };

  const Wrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.safeArea,
        { backgroundColor: theme.background },
        horizontalPaddingStyle,
        style,
      ]}
    >
      <Wrapper style={scrollable ? styles.scrollableContent : styles.content}>
        {children}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1, // Ensure content fills remaining space in non-scrollable view
  },
  scrollableContent: {
    flexGrow: 1, // Allows content to grow within ScrollView
  },
});
