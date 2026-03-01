import { Colors, Fonts, Radius } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type DropdownFieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  hasError?: boolean;
};

export default function DropdownField({
  label,
  value,
  placeholder = "Select an option",
  options,
  onChange,
  error,
  hasError = false,
}: DropdownFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={[styles.field, hasError && styles.errorBorder]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.fieldText, !value && styles.placeholder]}>
          {value ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#666" />
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>{label}</Text>

          {options.map((item) => (
            <Pressable
              key={item}
              style={[styles.option, value === item && styles.optionSelected]}
              onPress={() => {
                onChange(item);
                setVisible(false);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  value === item && styles.optionTextSelected,
                ]}
              >
                {item}
              </Text>
              {value === item && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={Colors.light.tint}
                />
              )}
            </Pressable>
          ))}
        </View>
      </Modal>
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
  field: {
    width: "100%",
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: "#999",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  errorBorder: {
    borderColor: "#EF4444",
  },
  fieldText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  placeholder: {
    color: "#999",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontFamily: Fonts.sans,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    fontFamily: Fonts.sans,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionSelected: {
    backgroundColor: Colors.light.tint + "15",
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  optionTextSelected: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
