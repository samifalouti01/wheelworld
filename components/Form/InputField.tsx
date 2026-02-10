import { Colors, Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  error?: string;
  hasError?: boolean;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
};

export default function InputField({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  hasError = false,
  isPasswordVisible = false,
  onTogglePasswordVisibility,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  const shouldHideText = secureTextEntry && !isPasswordVisible;
  const showEyeIcon = secureTextEntry && onTogglePasswordVisibility;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          focused && styles.focusedBorder,
          hasError && styles.errorBorder,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={shouldHideText}
          keyboardType={keyboardType}
          style={[styles.input, showEyeIcon && styles.inputWithIcon]}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />

        {showEyeIcon && (
          <TouchableOpacity
            onPress={onTogglePasswordVisibility}
            style={styles.eyeIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  inputWrapper: {
    borderWidth: 1.5,
    borderColor: "#999",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },

  focusedBorder: {
    borderColor: Colors.light.tint,
  },

  errorBorder: {
    borderColor: "#EF4444",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  inputWithIcon: {
    paddingRight: 8,
  },

  eyeIcon: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontFamily: Fonts.sans,
  },
});