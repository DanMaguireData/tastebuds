import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { spacing, textVariants } from "@/constants/theme";
// Custom Components
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";
import { FormField } from "@/components/common/FormField";
// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
// Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const passwordInputRef = useRef<TextInput>(null);

  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Functions
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in AuthContext will handle the redirect logic.
      // If you need to force it, uncomment the next line.
      // router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center", padding: spacing.lg }}>
      <AppText variant="h1" color="primary" style={{ textAlign: "center" }}>
        TasteBuds
      </AppText>
      <Spacer size="xxl" />

      <FormField
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        accessibilityLabel="Email input"
      />
      <Spacer size="md" />

      <FormField
        ref={passwordInputRef}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry={!isPasswordVisible}
        returnKeyType="go"
        onSubmitEditing={handleLogin}
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
      <Spacer size="xl" />

      <AppButton title="Log In" onPress={handleLogin} isLoading={isLoading} />
      <Spacer size="xl" />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <AppText variant="body" color="primary">
            Forgot Password?
          </AppText>
        </TouchableOpacity>
        <Spacer size="sm" />
        <View style={{ flexDirection: "row" }}>
          <AppText variant="body" color="textSecondary">
            {`Don't have an account?`}
          </AppText>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <AppText
              variant="body"
              color="primary"
              style={{ fontFamily: textVariants.h3.fontFamily }}
            >
              Sign Up
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
