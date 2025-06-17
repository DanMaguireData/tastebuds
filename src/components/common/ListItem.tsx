import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PressableProps,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/constants/theme";
import { AppText } from "./AppText";

interface ListItemProps extends PressableProps {
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
