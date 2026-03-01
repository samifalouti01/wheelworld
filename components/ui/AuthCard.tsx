/**
 * Reusable white bottom-sheet card that wraps every auth screen.
 */
import Handle from "@/components/Button/Handle";
import { Colors, Fonts, Radius } from "@/constants/theme";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export default function AuthCard({ children, scrollable = true }: Props) {
  const insets = useSafeAreaInsets();

  const inner = (
    <View style={[styles.card, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Consulting</Text>
        <Handle />
      </View>

      {scrollable ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.staticContent}>{children}</View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      contentContainerStyle={styles.keyboardContent}
      keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
      enabled
    >
      <View style={styles.sheetWrapper}>{inner}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardContent: { flex: 1 },
  sheetWrapper: { flex: 1, justifyContent: "flex-end" },
  card: {
    width: "100%",
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
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
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 24,
  },
  staticContent: {
    flex: 1,
    alignItems: "center",
  },
});
