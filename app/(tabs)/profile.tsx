// Resuable Components
import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
// React
import React, { useState } from "react";
import { Alert } from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
// Firebase
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function Profile() {
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert(
        "Logout Failed",
        "An error occurred while signing out. Please try again.",
      );
    } finally {
      setIsLoadingLogout(false);
    }
  };

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
            isLoading={isLoadingLogout}
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
