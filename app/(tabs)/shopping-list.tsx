import { StyleSheet } from "react-native";
import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";

export default function ShoppingList() {
  return (
    <Container style={styles.container}>
      <AppText variant="h1" color="primary">Shopping List Screen</AppText>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
