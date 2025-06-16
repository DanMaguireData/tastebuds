import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function Profile() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  function handleLogin() {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Logging out");
      setIsLoading(false);
      router.replace("/login");
    }, 100);
  }

  return (
    <Container edges={["bottom", "left", "right"]}>
      <AppText variant="h1" color="primary">
        Profile Screen
      </AppText>
      <Spacer size="xl" />
      <AppButton title="Logout" onPress={handleLogin} isLoading={isLoading} />
      <Spacer size="xl" />
      <AppButton
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onPress={toggleTheme}
        variant="primary"
      />
    </Container>
  );
}
