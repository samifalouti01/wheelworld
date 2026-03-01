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
import NumberInputField from "@/components/Form/NumberField";
import OrDivider from "@/components/Form/OrDivider";
import { Colors, Fonts } from "@/constants/theme";

type RegisterFormData = {
  fullName: string;
  phoneNumber: string;
  accountType: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      accountType: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearErrors("root.serverError");
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Register data:", data);
      router.push("/(auth)/Otp");
    } catch (error) {
      console.error("Register error:", error);
      setError("root.serverError", {
        type: "server",
        message: "Could not register right now. Please try again.",
      });
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
            <Text style={styles.welcome}>
              Lets Get <Text style={{ color: Colors.light.tint }}>Started</Text>
            </Text>

            <Text style={styles.subtitle}>
              Enter your details to create a new account.
            </Text>

            <Controller
              control={control}
              name="fullName"
              rules={{
                required: "Full name is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your full name"
                  error={errors.fullName?.message}
                  hasError={!!errors.fullName}
                />
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 9,
                  message: "Phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <NumberInputField
                  label="Phone number"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your phone number"
                  error={errors.phoneNumber?.message}
                  hasError={!!errors.phoneNumber}
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

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Confirm your password"
                  secureTextEntry
                  isPasswordVisible={showConfirmPassword}
                  onTogglePasswordVisibility={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  error={errors.confirmPassword?.message}
                  hasError={!!errors.confirmPassword}
                />
              )}
            />

            <PrimaryButton
              title="Continue  →"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              loading={isSubmitting}
            />

            {errors.root?.serverError?.message && (
              <Text style={styles.formErrorText}>
                {errors.root.serverError.message}
              </Text>
            )}

            <Text style={styles.signupText}>
              Already have an account?{" "}
              <Text
                style={styles.signupLink}
                onPress={() => router.push("/(auth)/login")}
              >
                Login
              </Text>
            </Text>

            <OrDivider />

            <SocialAuthButton
              provider="google"
              onPress={() => {}}
              mode="continue"
            />
            <SocialAuthButton
              provider="facebook"
              onPress={() => {}}
              mode="continue"
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

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    alignSelf: "flex-start",
    fontFamily: Fonts.sans,
  },

  formErrorText: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    fontFamily: Fonts.sans,
  },
});
