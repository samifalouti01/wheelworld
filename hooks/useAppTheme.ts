/**
 * useAppTheme – resolves the effective color scheme from the Zustand store.
 * When themeMode === "system" it falls back to the device scheme.
 */
import { useColorScheme as useDeviceScheme } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppStore } from "@/store/useAppStore";

export function useAppTheme() {
  const themeMode = useAppStore((s) => s.themeMode);
  const deviceScheme = useDeviceScheme();

  const resolvedScheme: "light" | "dark" =
    themeMode === "system" ? (deviceScheme ?? "light") : themeMode;

  const colors = Colors[resolvedScheme];

  return {
    scheme: resolvedScheme,
    isDark: resolvedScheme === "dark",
    colors,
  };
}
