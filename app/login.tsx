import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { AppButton } from "@/components/common/AppButton";
import { AppTextInput } from "@/components/common/AppTextInput";
import { AppText } from "@/components/common/AppText";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Logging in with:", { email, password });
      setIsLoading(false);
      router.replace("/home");
    }, 100);
  };

  return (
    <Container style={{ justifyContent: "center" }}>
      <Spacer size="xl" />
      <AppText variant="h2" style={{ textAlign: "center" }}>
        Login
      </AppText>
      <Spacer size="xl" />

      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Spacer size="md" />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Spacer size="xl" />

      <AppButton title="Login" onPress={handleLogin} isLoading={isLoading} />
      <Spacer size="md" />
      <AppButton
        title="Create Account"
        onPress={() => {}}
        variant="outline"
        disabled={isLoading}
      />
      <Spacer size="md" />
      <AppButton
        title="Guest"
        onPress={() => {}}
        variant="secondary"
        disabled={true}
      />
    </Container>
  );
}
