import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { signOut } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  function handleLogout() {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (user === undefined) {
        console.log("Cannot logout, no user");
        return;
      } else {
        signOut(user);
        setIsLoading(false);
        router.replace("/login");
      }
    }, 100);
  }

  return (
    <Container>
      <Spacer size="lg" />
      <AppText variant="h1" color="primary">
        Profile Screen
      </AppText>
      <Spacer size="xl" />
      {user ? (
        <>
          <AppText variant="body" color="textSecondary">
            Welcome, {user.email || "User"}!
          </AppText>
          <AppText variant="caption" color="textSecondary">
            User ID: {user.uid}
          </AppText>
          <AppButton
            title="Logout"
            onPress={handleLogout}
            isLoading={isLoading}
          />
        </>
      ) : (
        <AppText variant="h2" color="textSecondary">
          Not Logged In
        </AppText>
      )}
      <Spacer size="xl" />
      <AppButton
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onPress={toggleTheme}
        variant="primary"
      />
    </Container>
  );
}
