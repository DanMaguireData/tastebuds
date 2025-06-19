// React
import React, { useState, useEffect } from "react";
// Components
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";
import { FormField } from "@/components/common/FormField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Pressable,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
// Theme
import { textVariants, spacing } from "@/constants/theme";
// Hook
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
//Services
import { createUserProfileDocument } from "@/services/userService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // Memoized value to control button's disabled state efficiently
  const isFormValid =
    !Object.values(errors).some((error) => error) &&
    email &&
    password &&
    confirmPassword;

  // --- NEW: Real-time validation runs whenever a value changes ---
  useEffect(() => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Only validate fields that have been "touched" to avoid premature errors
    if (touched.email && !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (touched.password && password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (touched.confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
  }, [email, password, confirmPassword, touched]);

  const handleBlur = (field: "email" | "password" | "confirmPassword") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    // Mark all fields as touched to show all errors on submit attempt
    setTouched({ email: true, password: true, confirmPassword: true });

    // Re-check validation one last time
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!emailRegex.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (password.length < PASSWORD_MIN_LENGTH)
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Create User Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //If authentication is successful, create the user profile in Firestore
      await createUserProfileDocument(userCredential.user);
      console.log("Account created successfully!", userCredential.user.uid);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Registration Failed",
          "This email address is already in use by another account.",
        );
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Registration Failed", "That email address is invalid!");
      } else {
        Alert.alert("Registration Failed", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center", padding: spacing.lg }}>
      <AppText variant="h1" color="primary" style={{ textAlign: "center" }}>
        TasteBuds
      </AppText>
      <Spacer size="sm" />
      <AppText
        variant="h3"
        color="textSecondary"
        style={{ textAlign: "center" }}
      >
        Create Account
      </AppText>
      <Spacer size="xxl" />

      <FormField
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        onBlur={() => handleBlur("email")}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email input"
      />
      <Spacer size="md" />

      {/* Password Field with Helper Text */}
      <View>
        <FormField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          onBlur={() => handleBlur("password")}
          helperText={`Must be at least ${PASSWORD_MIN_LENGTH} characters.`}
          error={errors.password}
          secureTextEntry={!isPasswordVisible}
          accessibilityLabel="Password input"
          rightIcon={
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={theme.input.placeholder}
              />
            </Pressable>
          }
        />
      </View>
      <Spacer size="md" />

      <FormField
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onBlur={() => handleBlur("confirmPassword")}
        error={errors.confirmPassword}
        secureTextEntry={!isConfirmPasswordVisible}
        accessibilityLabel="Confirm password input"
        rightIcon={
          <Pressable
            onPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            <MaterialCommunityIcons
              name={
                isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"
              }
              size={24}
              color={theme.input.placeholder}
            />
          </Pressable>
        }
      />
      <Spacer size="xl" />

      <AppButton
        title="Sign Up"
        onPress={handleSignUp}
        isLoading={isLoading}
        disabled={!isFormValid || isLoading} // Button is disabled until form is valid
      />
      <Spacer size="lg" />

      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <AppText variant="body" color="textSecondary">
            Already have an account?{" "}
          </AppText>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <AppText
              variant="body"
              color="primary"
              style={{ fontFamily: textVariants.h3.fontFamily }}
            >
              Log In
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
