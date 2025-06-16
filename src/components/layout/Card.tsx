import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/constants/theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle; // Allow custom styles
  padding?: keyof typeof spacing;
}

export function Card({ children, style, padding = "md" }: CardProps) {
  const { theme } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: theme.surface,
    borderRadius: spacing.sm,
    padding: spacing[padding],
    //...theme.cardShadow, // TODO: Deal with shadows
  };

  return <View style={[cardStyle, style]}>{children}</View>;
}
