import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { Colors, Fonts } from "@/constants/theme";

export default function Success() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Consulting</Text>
        <Handle />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrapper}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.heading}>Success!</Text>

        <Text style={styles.subtitle}>
          Your request has been completed successfully. You can now continue to
          the next step.
        </Text>

        <PrimaryButton
          title="Continue"
          onPress={() => router.replace("/(tabs)")}
        />

        <Text
          style={styles.back}
          onPress={() => router.replace("/(auth)/login")}
        >
          Back to Login
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -24,
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,

    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 0,
  },

  header: {
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    alignItems: "center",
    paddingBottom: 64,
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.tint + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  check: {
    fontSize: 36,
    color: Colors.light.tint,
    fontWeight: "800",
  },

  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 8,
    fontFamily: Fonts.sans,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },

  back: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
});
