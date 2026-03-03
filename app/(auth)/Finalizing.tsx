/**
 * "Finalizing Your Strategic Space" – animated loading screen
 */
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import { Colors, Fonts, Radius } from "@/constants/theme";

export default function Finalizing() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      router.replace("/(tabs)");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.sheetWrapper}>
        <View
          style={[styles.card, { paddingBottom: Math.max(insets.bottom, 40) }]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Consulting</Text>
            <Handle />
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>
              Finalizing Your{"\n"}
              <Text style={styles.tint}>Strategic Space</Text>
            </Text>

            <Text style={styles.subtitle}>
              We're Preparing your personalized dashboard with Algerian market
              insights
            </Text>

            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>INITIALIZING ...</Text>
              <View style={styles.progressTrack}>
                <Animated.View
                  style={[styles.progressBar, { width: barWidth }]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  header: { alignItems: "center", marginBottom: 8 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
    fontFamily: Fonts.sans,
  },
  tint: { color: Colors.light.tint },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 48,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 2,
    color: Colors.light.tint,
    marginBottom: 12,
    fontFamily: Fonts.mono,
  },
  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: Colors.light.tint,
  },
});
