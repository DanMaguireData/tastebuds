// Resuable Components
import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
import { ProfileInfoSkeleton } from "@/components/profile/ProfileInfoSkeleton";
import { Card } from "@/components/layout/Card";
import { ListItem } from "@/components/common/ListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DisplayPill } from "@/components/common/DisplayPill";
// React
import React, { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
// Firebase
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
// Theme
import { textVariants, spacing } from "@/constants/theme";

export default function Profile() {
  //State
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  // Hooks
  const { isDark, toggleTheme, theme } = useTheme();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const confirmSignOut = () => {
    Alert.alert(
      "Sign Out", // Title
      "Are you sure you want to sign out?", // Message
      [
        {
          text: "Cancel",
          style: "cancel", // Does nothing, just closes the alert
        },
        {
          text: "Sign Out",
          style: "destructive", // Gives the text a red color on iOS
          onPress: handleLogout, // Executes the sign-out logic
        },
      ],
    );
  };

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

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const renderContent = () => {
    // 1. Handle Loading State with Skeleton UI
    if (isLoading) {
      return <ProfileInfoSkeleton />;
    }

    // 2. Handle Logged In State
    if (user) {
      const hasPreferences =
        user.dietaryPreferences && user.dietaryPreferences.length > 0;
      return (
        <Card>
          <View style={styles.cardHeader}>
            <View style={styles.cardContent}>
              {/* --- Email Section --- */}
              <AppText variant="caption" color="textSecondary">
                Email
              </AppText>
              <Spacer size="xs" />
              <AppText
                variant="body"
                style={{ fontFamily: textVariants.button.fontFamily }}
              >
                {user.email}
              </AppText>
              <Spacer size="md" />

              {/* --- Name Section --- */}
              <AppText variant="caption" color="textSecondary">
                Name
              </AppText>
              <Spacer size="xs" />
              <AppText
                variant="body"
                style={{ fontFamily: textVariants.button.fontFamily }}
              >
                {user.name || "Not set"}
              </AppText>
              <Spacer size="md" />

              {/* --- 2. Dietary Preferences Section --- */}
              <AppText variant="caption" color="textSecondary">
                Dietary Preferences
              </AppText>
              <Spacer size="xs" />
              {hasPreferences ? (
                <View style={styles.pillsContainer}>
                  {user.dietaryPreferences?.map((pref) => (
                    <DisplayPill key={pref} text={pref} />
                  ))}
                </View>
              ) : (
                <AppText
                  variant="body"
                  color="textSecondary"
                  style={{ fontStyle: "italic" }}
                >
                  None selected
                </AppText>
              )}
            </View>

            <TouchableOpacity
              onPress={handleEditProfile}
              style={styles.editButton}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>
        </Card>
      );
    }

    // 3. Handle Logged Out State (edge case, usually navigated away)
    return (
      <AppText variant="h3" color="textSecondary">
        Not Logged In
      </AppText>
    );
  };

  return (
    <Container edges={["left", "right", "top"]} style={styles.container}>
      <View>
        <AppText variant="h2">My Profile</AppText>
        <Spacer size="lg" />
        {renderContent()}

        <Spacer size="lg" />
        {/* 2. "Settings" card using the new ListItem */}
        <Card>
          <ListItem
            text="Dark Mode"
            rightContent={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#767577", true: theme.primary }}
                thumbColor={isDark ? theme.surface : "#f4f3f4"}
              />
            }
          />
          {/* You can easily add more settings here in the future */}
          {/* <ListItem text="Notifications" rightContent={<MaterialCommunityIcons name="chevron-right" ... />} /> */}
        </Card>
      </View>
      <Spacer size="lg" />
      {user && (
        <AppButton
          title="Sign Out"
          onPress={confirmSignOut}
          variant="destructive" // We will add this new variant
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  editButton: {
    padding: spacing.xs,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xs,
  },
});
