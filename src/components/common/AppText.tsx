import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { TextVariant, ThemeColors, textVariants } from "@/constants/theme"; // Import our new type

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: TextVariant; // Use our defined variants
  color?: keyof ThemeColors; // Allow dynamic color selection
}

export function AppText({
  children,
  variant = "body", // Default to the 'body' style
  color = "textPrimary", // Default to the primary text color
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
