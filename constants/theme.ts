/**
 * WheelWorld Consulting – Design tokens
 */

import { Platform } from "react-native";

const tint = "#00D599";

export const Colors = {
  light: {
    text: "#11181C",
    textSecondary: "#666",
    background: "#FFFFFF",
    surface: "#F5F6F8",
    card: "#FFFFFF",
    tint,
    icon: "#687076",
    border: "#E5E7EB",
    tabIconDefault: "#687076",
    tabIconSelected: tint,
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#9BA1A6",
    background: "#151718",
    surface: "#1E2022",
    card: "#1E2022",
    tint,
    icon: "#9BA1A6",
    border: "rgba(255,255,255,0.1)",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tint,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
  sheet: 60,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/** Shadows */
export const Shadow = {
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    android: {
      elevation: 3,
    },
    default: {},
  }) as Record<string, unknown>,
};
