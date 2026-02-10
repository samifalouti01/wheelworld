import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SocialAuthButton from "@/components/Button/SocialAuthButton";
import InputField from "@/components/Form/InputField";
import OrDivider from "@/components/Form/OrDivider";
import { Colors, Fonts } from "@/constants/theme";

type LoginFormData = {
  emailOrUsername: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login data:", data);
      router.push("/(auth)/Success");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
            <Text style={styles.welcome}>Welcome Back</Text>

            <Text style={styles.subtitle}>
              Enter your credentials to access your account.
            </Text>

            <Controller
              control={control}
              name="emailOrUsername"
              rules={{
                required: "Email or username is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Username or Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your email"
                  error={errors.emailOrUsername?.message}
                  hasError={!!errors.emailOrUsername}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your password"
                  secureTextEntry
                  isPasswordVisible={showPassword}
                  onTogglePasswordVisibility={() =>
                    setShowPassword((prev) => !prev)
                  }
                  error={errors.password?.message}
                  hasError={!!errors.password}
                />
              )}
            />

            <Text
              style={styles.forgot}
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              Forgot Password?
            </Text>

            <PrimaryButton
              title="Login"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              loading={isSubmitting}
            />

            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text
                style={styles.signupLink}
                onPress={() => router.push("/(auth)/register")}
              >
                Sign Up
              </Text>
            </Text>

            <OrDivider />

            <SocialAuthButton
              provider="google"
              onPress={() => {}}
              mode="signin"
            />
            <SocialAuthButton
              provider="facebook"
              onPress={() => {}}
              mode="signin"
            />

            <Text style={styles.legalText}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms of Service</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
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
    paddingBottom: 24,
  },

  welcome: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 4,
    fontFamily: Fonts.sans,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 16,
    fontSize: 14,
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },

  signupText: {
    marginVertical: 12,
    color: "#666",
  },

  signupLink: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },

  legalText: {
    marginTop: 12,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },

  link: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
});
