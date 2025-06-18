import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      {/* This screen is not in the layout, so it uses the parent's header */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* This screen will be presented as a modal */}
      <Stack.Screen
        name="edit"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
