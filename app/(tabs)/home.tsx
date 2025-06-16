import { Text, StyleSheet } from "react-native";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/layout/Card";
import { Spacer } from "@/components/layout/Spacer";
import { useTheme } from "@/hooks/useTheme";
import { typography } from "@/constants/theme";

export default function Home() {
  const { theme } = useTheme();
  return (
    <Container>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Welcome to My App!
      </Text>
      <Spacer size="lg" />
      <Card>
        <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
          Daily Recipe Idea
        </Text>
        <Spacer size="sm" />
        <Text style={{ color: theme.textSecondary }}>
          How about a delicious Chicken Tikka Masala today?
        </Text>
      </Card>
      <Spacer size="md" />
      <Card padding="xl">
        <Text style={{ color: theme.textPrimary }}>
          This card has extra large padding inside!
        </Text>
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
