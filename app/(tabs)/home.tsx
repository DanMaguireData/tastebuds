import {StyleSheet } from "react-native";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/layout/Card";
import { Spacer } from "@/components/layout/Spacer";
import { AppText } from "@/components/common/AppText";
import { useTheme } from "@/hooks/useTheme";

import { typography } from "@/constants/theme";

export default function Home() {
  const { theme } = useTheme();
  return (
    <Container>
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

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSizes.lg,
    textAlign: "center",
  },
  cardTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 18,
  },
});
