import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import InputField from "@/components/Form/InputField";
import { Colors, Fonts } from "@/constants/theme";

export default function ResetPassword() {
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
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Reset Password</Text>

        <Text style={styles.subtitle}>
          Enter your email address and we’ll send you a link to reset your
          password.
        </Text>

        <InputField
          label="Email Address"
          value=""
          onChangeText={() => {}}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <PrimaryButton title="Send Reset Link" onPress={() => {}} />

        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Back to Login</Text>
        </Pressable>
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
    marginBottom: 24,
    lineHeight: 22,
  },

  back: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
});
