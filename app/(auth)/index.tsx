import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { Colors, Fonts } from "@/constants/theme";

export default function Start() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.card, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Consulting</Text>
        <Handle />
      </View>

      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.consulting}>Consulting</Text>
          <Text style={styles.highlight}>Excellence</Text>

          <Text style={styles.subtitle}>
            Strategic insights for the modern Algerian market.
          </Text>

          <PrimaryButton
            title="Get Started"
            onPress={() => router.push("/(auth)/login")}
          />

          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.signIn}>Register</Text>
          </Pressable>
        </View>

        <Text style={styles.trusted}>Trusted By 300+ Companies</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0, 
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 24,
    paddingTop: 12,
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

  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  consulting: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 2,
    fontFamily: Fonts.sans,
  },

  highlight: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.tint,
    marginBottom: 12,
    fontFamily: Fonts.sans,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 16,
  },

  signIn: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.text,
    textDecorationLine: "underline",
  },

  trusted: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    paddingBottom: 12,
  },
});