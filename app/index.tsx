import { Redirect } from "expo-router";

// This component will automatically redirect any user who lands on the root route ("/")
// to the "/home" route, which is handled by your (tabs)/home.tsx file.
export default function Index() {
  return <Redirect href="/login" />;
}
