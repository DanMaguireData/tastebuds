// React
import React from "react";
// Components
import { View, ViewStyle } from "react-native";
// Theme
import { spacing } from "../../constants";

type SpacerSize = keyof typeof spacing;

interface SpacerProps {
  size?: SpacerSize;
  horizontal?: boolean;
  style?: ViewStyle;
}

export function Spacer({
  size = "md",
  horizontal = false,
  style,
}: SpacerProps) {
  const spacerStyle: ViewStyle = horizontal
    ? { width: spacing[size] }
    : { height: spacing[size] };

  return <View style={[spacerStyle, style]} />;
}
