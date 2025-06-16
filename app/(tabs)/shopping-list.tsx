import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { typography } from "@/constants/theme";

export default function ShoppingList() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.primary }]}>
        Shopping List Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontFamily: typography.fontFamily.bold,
  },
});
