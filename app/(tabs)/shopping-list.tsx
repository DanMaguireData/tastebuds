import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import { useTheme } from "@/hooks/useTheme";

export default function ShoppingList() {
  useFonts({
    Poppins_700Bold,
  });
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
    fontFamily: "Poppins_700Bold",
  },
});
