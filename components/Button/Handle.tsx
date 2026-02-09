// components/ui/Handle.tsx
import { Colors } from "@/constants/theme";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function Handle() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return <View style={[styles.handle, { backgroundColor: colors.icon }]} />;
}
const styles = StyleSheet.create({
  handle: {
    alignSelf: "center",
    width: 120,
    height: 8,
    borderRadius: 100,
    marginBottom: 16,
    marginTop: 8,
    opacity: 0.6,
  },
});
