// React
import React from "react";
// Components
import { Text, TextProps } from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { TextVariant, ThemeColorKeys, textVariants } from "@/constants/theme";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: ThemeColorKeys;
}

export function AppText({
  children,
  variant = "body",
  color = "textPrimary",
  style,
  ...rest
}: AppTextProps) {
  const { theme } = useTheme();

  // 1. Get the base style from the theme's textVariants
  const textVariantStyle = textVariants[variant];

  // 2. Get the color from the theme's colors
  const textColorStyle = { color: theme[color] };

  // 3. Combine them: base variant + dynamic color + custom overrides
  const combinedStyle = [textVariantStyle, textColorStyle, style];

  return (
    <Text style={combinedStyle} {...rest}>
      {children}
    </Text>
  );
}
