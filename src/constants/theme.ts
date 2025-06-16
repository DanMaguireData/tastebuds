import { TextStyle } from "react-native";

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  input: {
    background: string;
    text: string;
    placeholder: string;
    border: string;
    borderFocused: string;
    label: string;
  };
};

export const darkTheme: ThemeColors = {
  primary: "#FF7043",
  secondary: "#FFB300",
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#BDBDBD",
  success: "#66BB6A",
  error: "#EF5350",
  warning: "#FFB300",
  info: "#4FC3F7",
  input: {
    background: "#1E1E1E",
    text: "#E0E0E0",
    placeholder: "#757575",
    label: "#BDBDBD",
    border: "rgba(255, 255, 255, 0.3)",
    borderFocused: "#FF7043",
  },
};

export const lightTheme: ThemeColors = {
  primary: "#BF360C",
  secondary: "#FFA000",
  background: "#FFF3E0",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#616161",
  success: "#4CAF50",
  error: "#D32F2F",
  warning: "#FFA000",
  info: "#29B6F6",
  input: {
    background: "#FFFFFF",
    text: "#212121",
    placeholder: "#9E9E9E",
    label: "#616161",
    border: "rgba(0, 0, 0, 0.23)",
    borderFocused: "#BF360C",
  },
};

type KeysForStringValues<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type ThemeColorKeys = KeysForStringValues<typeof lightTheme>;

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontFamily: {
    light: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    bold: "Poppins_700Bold",
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const iconSizes = {
  tabBar: 24,
};

export const textVariants = {
  h1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSizes.xxl,
    lineHeight: typography.fontSizes.xxl * typography.lineHeight.tight,
  } as TextStyle,
  h2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSizes.xl,
    lineHeight: typography.fontSizes.xl * typography.lineHeight.tight,
  } as TextStyle,
  h3: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSizes.lg,
    lineHeight: typography.fontSizes.lg * typography.lineHeight.tight,
  } as TextStyle,
  body: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSizes.md,
    lineHeight: typography.fontSizes.md * typography.lineHeight.normal,
  } as TextStyle,
  caption: {
    fontFamily: typography.fontFamily.light,
    fontSize: typography.fontSizes.sm,
    lineHeight: typography.fontSizes.sm * typography.lineHeight.normal,
  } as TextStyle,
  button: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSizes.md,
    textAlign: "center",
  } as TextStyle,
};

export type TextVariant = keyof typeof textVariants;
