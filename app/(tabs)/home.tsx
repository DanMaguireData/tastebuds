import { Container } from "@/components/layout/Container";
import { Card } from "@/components/layout/Card";
import { Spacer } from "@/components/layout/Spacer";
import { AppText } from "@/components/common/AppText";

export default function Home() {
  return (
    <Container edges={["bottom", "left", "right"]}>
      <AppText variant="h1" color="primary">
        Welcome to My App!
      </AppText>
      <Spacer size="lg" />
      <Card>
        <AppText variant="h2" color="textPrimary">
          Daily Recipe Idea
        </AppText>
        <Spacer size="sm" />
        <AppText variant="body" color="textSecondary">
          How about a delicious Chicken Tikka Masala today?
        </AppText>
      </Card>
      <Spacer size="md" />
      <Card padding="xl">
        <AppText variant="body" color="textPrimary">
          This card has extra large padding inside!
        </AppText>
      </Card>
      <Spacer size="xl" />
    </Container>
  );
}
