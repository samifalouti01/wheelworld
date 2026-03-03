/**
 * Two-tone section title: first part in dark, second part in tint.
 * e.g. "Who Are " + "you?"
 */
import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  prefix: string;
  highlight: string;
  size?: number;
};

export default function SectionTitle({ prefix, highlight, size = 28 }: Props) {
  return (
    <View style={styles.row}>
      <Text style={[styles.prefix, { fontSize: size }]}>{prefix}</Text>
      <Text style={[styles.highlight, { fontSize: size }]}>{highlight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  prefix: {
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  highlight: {
    fontWeight: "800",
    color: Colors.light.tint,
    fontFamily: Fonts.sans,
  },
});
