// app/(auth)/_layout.tsx
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Slot, usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const showBack = pathname !== "/";

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.background}>
        <Image
          source={require("../../assets/auth/map.png")}
          style={styles.map}
          resizeMode="contain"
        />

        <View style={styles.brand}>
          <Text style={styles.brandTitle}>WHEELWORLD</Text>
        </View>
      </View>

      {showBack && (
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={10}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
        </Pressable>
      )}

      <View style={styles.foreground}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingTop: 40,
  },

  map: {
    width: "100%",
    height: 220,
    opacity: 0.25,
  },

  brand: {
    marginTop: -20,
    alignItems: "center",
  },

  brandTitle: {
    fontSize: 42,
    fontWeight: "700",
    color: Colors.dark.tint,
    letterSpacing: 2,
    fontFamily: Fonts.sans,
    marginBottom: 4,
  },

  brandSubtitle: {
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.7,
    marginTop: 4,
    fontFamily: Fonts.sans,
  },

  backButton: {
    position: "absolute",
    top: 55,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  foreground: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
