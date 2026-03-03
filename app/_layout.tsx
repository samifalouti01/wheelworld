import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const { isDark } = useAppTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? "light" : "dark"} />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="expert" />
          <Stack.Screen name="consultation" />
          <Stack.Screen name="onBoarding" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="edit-profile" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
