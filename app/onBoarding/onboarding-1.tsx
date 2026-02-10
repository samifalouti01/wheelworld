import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Onboarding1({ onNext }: { onNext: () => void }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image
            style={styles.illustration}
            source={require("../../assets/images/onboarding-1.png")}
          />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          Get Expert Guidance, Fast
        </Text>

        <Text style={[styles.subtitle, { color: theme.icon }]}>
          Connect with verified consultants tailored to your goals.
        </Text>

        <View style={styles.bulletList}>
          <Text style={[styles.bullet, { color: theme.text }]}>
            Key points:
          </Text>
          <Text style={[styles.bullet, { color: theme.text }]}>
            1. Business, legal, tech, and personal consulting
          </Text>
          <Text style={[styles.bullet, { color: theme.text }]}>
            2. Hand-picked experts with proven experience
          </Text>
          <Text style={[styles.bullet, { color: theme.text }]}>
            3. Handpicked experts with proven experience
          </Text>
          <Text style={[styles.bullet, { color: theme.text }]}>
            4. Available anytime, anywhere
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.tint }]}
        onPress={() => router.push("/onBoarding/onboarding-2")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  illustrationContainer: {
    marginBottom: 16,
  },
  illustration: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: -8,
  },
  bulletList: {
    width: "100%",
    gap: 12,
    paddingHorizontal: 12,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
  },
});
