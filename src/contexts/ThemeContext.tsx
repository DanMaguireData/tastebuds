import React, { createContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, ThemeColors } from "@/constants/theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeColors;
  themeMode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  // Determine if we should use dark theme
  const isDark =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  // Select the appropriate theme
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const value = {
    theme,
    themeMode,
    isDark,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
