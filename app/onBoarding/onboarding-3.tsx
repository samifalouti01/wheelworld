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

export default function Onboarding3({
  onPrev,
  onFinish,
}: {
  onPrev: () => void;
  onFinish: () => void;
}) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image
            style={styles.illustration}
            source={require("../../assets/images/onboarding-3.png")}
          />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          Start Your First Consultation Today
        </Text>

        <Text style={[styles.subtitle, { color: theme.icon }]}>
          Whether you need quick advice or long-term guidance, our experts are
          here to help you succeed.
        </Text>

        <View style={styles.highlights}>
          <Text style={[styles.highlightTitle, { color: theme.tint }]}>
            Highlights
          </Text>
          <Text style={[styles.highlightItem, { color: theme.icon }]}>
            • Flexible pricing
          </Text>
          <Text style={[styles.highlightItem, { color: theme.icon }]}>
            • Instant or scheduled sessions
          </Text>
          <Text style={[styles.highlightItem, { color: theme.icon }]}>
            • Cancel anytime
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.prevButton, { borderColor: theme.icon }]}
          onPress={() => router.push("/onBoarding/onboarding-2")}
        >
          <Text style={[styles.prevButtonText, { color: theme.icon }]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.finishButton, { backgroundColor: theme.tint }]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.finishButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
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
    gap: 28,
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
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  highlights: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 213, 153, 0.07)",
    gap: 10,
  },
  highlightTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  highlightItem: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  prevButton: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  prevButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  finishButton: {
    flex: 2,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  finishButtonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "700",
  },
});
