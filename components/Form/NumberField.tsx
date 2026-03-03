import { Colors, Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (phone: string) => void; // returns only local number
  placeholder?: string;
  error?: string;
  hasError?: boolean;
};

export default function PhoneInputField({
  label,
  value,
  onChangeText,
  placeholder = "5 14 99 52 34",
  error,
  hasError = false,
}: Props) {
  const [focused, setFocused] = useState(false);

  // keep only digits & remove starting 0
  const handleChange = (text: string) => {
    let digits = text.replace(/\D/g, "");

    // Algeria: remove leading 0 (055 -> 55)
    if (digits.startsWith("0")) {
      digits = digits.substring(1);
    }

    // limit to 9 digits
    digits = digits.slice(0, 9);

    onChangeText(digits);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.wrapper,
          focused && styles.focusedBorder,
          hasError && styles.errorBorder,
        ]}
      >
        {/* Country code box */}
        <View style={styles.prefixBox}>
          <Text style={styles.prefixText}>+213</Text>
        </View>

        {/* Phone input */}
        <TextInput
          value={value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          placeholder={placeholder}
          placeholderTextColor="#999"
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
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

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#999",
    borderRadius: 14,
    height: 52,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  prefixBox: {
    paddingHorizontal: 14,
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },

  prefixText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  focusedBorder: {
    borderColor: Colors.light.tint,
  },

  errorBorder: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontFamily: Fonts.sans,
  },
});