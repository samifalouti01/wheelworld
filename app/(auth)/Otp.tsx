import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { Colors, Fonts } from "@/constants/theme";

export default function Otp() {
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
        <Text style={styles.heading}>Verification Code</Text>

        <Text style={styles.subtitle}>
          Enter the 6-digit code we sent to your email or phone number.
        </Text>

        <View style={styles.otpContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        <PrimaryButton
          title="Verify"
          onPress={() => router.push("/(auth)/Success")}
        />

        <Pressable>
          <Text style={styles.resend}>Resend Code</Text>
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
    marginBottom: 32,
    lineHeight: 22,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },

  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#999",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
    backgroundColor: "#fff",
  },

  resend: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
});
