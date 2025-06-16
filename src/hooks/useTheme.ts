import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

/**
 * Hook to access the current theme context
 *
 * @returns Theme context containing theme values and utilities
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```typescript
 * const { theme, isDark, toggleTheme } = useTheme();
 * const backgroundColor = theme.colors.surface;
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. " +
        "Make sure your component is wrapped with <ThemeProvider>.",
    );
  }

  return context;
}
