import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import InputField from "@/components/Form/InputField";
import { Colors, Fonts } from "@/constants/theme";

export default function ResetPassword() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      contentContainerStyle={styles.keyboardContent}
      keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
      enabled
    >
      <View style={styles.sheetWrapper}>
        <View
          style={[styles.card, { paddingBottom: Math.max(insets.bottom, 24) }]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Consulting</Text>
            <Handle />
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <Text style={styles.heading}>Reset Password</Text>

            <Text style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your
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
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardContent: {
    flex: 1,
  },

  sheetWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  card: {
    width: "100%",
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

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
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
