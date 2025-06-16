import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";

export default function RecipeBook() {
  return (
    <Container edges={["bottom", "left", "right"]}>
      <AppText variant="h1" color="primary">
        Recipe Book Screen
      </AppText>
    </Container>
  );
}
