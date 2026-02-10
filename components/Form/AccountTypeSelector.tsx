import { Colors, Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type AccountType = "Individual" | "Company" | "Other";

type AccountTypeSelectorProps = {
  value?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
};

export default function AccountTypeSelector({
  value,
  onChange,
  hasError = false,
}: AccountTypeSelectorProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        style={[styles.field, hasError && styles.errorBorder]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.fieldText, !value && styles.placeholder]}>
          {value ?? "Select account type"}
        </Text>

        <Text style={styles.arrow}>▾</Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        <View style={styles.sheet}>
          <Text style={styles.title}>Select Account Type</Text>

          {["Individual", "Company", "Other"].map((item) => (
            <Pressable
              key={item}
              style={styles.option}
              onPress={() => {
                onChange?.(item as AccountType);
                setVisible(false);
              }}
            >
              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#999",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 16,
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

  arrow: {
    fontSize: 18,
    color: "#666",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sheet: {
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  option: {
    paddingVertical: 16,
  },

  optionText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
});
