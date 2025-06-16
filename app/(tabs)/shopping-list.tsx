import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";

export default function ShoppingList() {
  return (
    <Container>
      <Spacer size="lg" />
      <AppText variant="h1" color="primary">
        Shopping List Screen
      </AppText>
    </Container>
  );
}
