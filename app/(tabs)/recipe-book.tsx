import { StyleSheet } from "react-native";
import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";

export default function RecipeBook() {
  return (
    <Container style={styles.container} edges={["bottom", "left", "right"]}>
      <AppText variant="h1" color="primary">
        Recipe Book Screen
      </AppText>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
