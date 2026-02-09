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
import { Colors } from "@/constants/theme";

export default function Onboarding2({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
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
            source={require("../../assets/images/onboarding-2.png")}
          />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          Simple. Secure. Effective.
        </Text>

        <Text style={[styles.subtitle, { color: theme.icon }]}>
          4 easy steps to get started
        </Text>

        <View style={styles.steps}>
          <Text style={[styles.stepItem, { color: theme.text }]}>
            1. Choose your consulting category
          </Text>
          <Text style={[styles.stepItem, { color: theme.text }]}>
            2. Match with the ideal expert
          </Text>
          <Text style={[styles.stepItem, { color: theme.text }]}>
            3. Chat, call, or video consult
          </Text>
          <Text style={[styles.stepItem, { color: theme.text }]}>
            4. Get actionable advice
          </Text>
          <Text style={[styles.highlightTitle, { color: theme.tint }]}>
            Trust signals
          </Text>
          <Text style={[styles.highlightItem, { color: theme.icon }]}>
            • Transparent pricing
          </Text>
          <Text style={[styles.highlightItem, { color: theme.icon }]}>
            • Secure communication
          </Text>
          <Text style={[styles.highlightItem, { color: theme.icon }]}>
            • Ratings & reviews
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.prevButton, { borderColor: theme.icon }]}
          onPress={() => router.push("/onBoarding/onboarding-1")}
        >
          <Text style={[styles.prevButtonText, { color: theme.icon }]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: theme.tint }]}
          onPress={() => router.push("/onBoarding/onboarding-3")}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  steps: {
    width: "100%",
    gap: 14,
    paddingHorizontal: 8,
  },
  stepItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  highlightItem: {
    fontSize: 15,
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
  nextButton: {
    flex: 1.5,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
