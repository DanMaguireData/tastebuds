import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";

export default function ShoppingList() {
  return (
    <Container edges={["bottom", "left", "right"]}>
      <AppText variant="h1" color="primary">
        Shopping List Screen
      </AppText>
    </Container>
  );
}
