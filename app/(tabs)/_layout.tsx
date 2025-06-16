import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/hooks/useTheme";
import { typography, iconSizes } from "@/constants/theme";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        // Header Styles
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.textPrimary,
        },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        // NavBar
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: "transparent",
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.medium,
          fontSize: typography.fontSizes.xs,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "restaurant" : "restaurant-outline"}
              color={color}
              size={iconSizes.tabBar}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe-book"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              color={color}
              size={iconSizes.tabBar}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: "Shopping",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bag" : "bag-outline"}
              color={color}
              size={iconSizes.tabBar}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={iconSizes.tabBar}
            />
          ),
        }}
      />
    </Tabs>
  );
}
