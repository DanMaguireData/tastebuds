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
};

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
    light: "Poppins-Regular",
    medium: "Poppins-Medium",
    bold: "Poppins-Bold",
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

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
} as const;
