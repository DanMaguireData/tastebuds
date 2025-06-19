// React
import React from "react";
// Components
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { AppText } from "./AppText";
// Theme
import { spacing } from "@/constants/theme";

interface ListItemProps extends TouchableOpacityProps {
  text: string;
  rightContent?: React.ReactNode;
}

export function ListItem({
  text,
  rightContent,
  onPress,
  ...rest
}: ListItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={styles.container}
      {...rest}
    >
      <AppText variant="body">{text}</AppText>
      {rightContent && <View>{rightContent}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
});
