import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function LegalFooter() {
  return (
    <Text style={styles.text}>
      <Text style={styles.link}>Terms & Conditions</Text>
      {"  •  "}
      <Text style={styles.link}>Privacy Policy</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    fontFamily: Fonts.sans,
  },
  link: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
});
