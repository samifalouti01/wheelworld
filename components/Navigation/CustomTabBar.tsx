import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  const isAndroid = Platform.OS === "android";
  const isDark = colorScheme === "dark";

  const glassTint = isDark ? "dark" : "light";

  const glassFill = isDark ? "rgba(18,18,18,0.72)" : "rgba(255,255,255,0.72)";

  const borderColor = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.6)";

  const highlightOpacity = isDark ? 0.06 : 0.25;

  const renderTabs = () =>
    state.routes.map((route, index) => {
      const isFocused = state.index === index;

      let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

      if (route.name === "index") {
        iconName = isFocused ? "home" : "home-outline";
      } else if (route.name === "dossier") {
        iconName = isFocused ? "document-text" : "document-text-outline";
      } else if (route.name === "diagnostics") {
        iconName = isFocused ? "bar-chart" : "bar-chart-outline";
      } else if (route.name === "profile") {
        iconName = isFocused ? "person" : "person-outline";
      }

      const onPress = () => {
        if (!isFocused) {
          navigation.navigate(route.name);
        }
      };

      return (
        <TouchableOpacity
          key={route.key}
          onPress={onPress}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              isAndroid && styles.androidIconContainer,
              {
                backgroundColor: isAndroid
                  ? isFocused
                    ? theme.tint + "2E"
                    : "transparent"
                  : isFocused
                    ? theme.tint + "22"
                    : "transparent",
                borderWidth: isAndroid && isFocused ? 1 : 0,
                borderColor: isAndroid
                  ? isFocused
                    ? theme.tint + "80"
                    : "transparent"
                  : "transparent",
              },
            ]}
          >
            <Ionicons
              name={iconName}
              size={isAndroid ? 22 : 24}
              color={
                isAndroid
                  ? isFocused
                    ? theme.tint
                    : theme.tabIconDefault
                  : isFocused
                    ? theme.tint
                    : theme.tabIconDefault
              }
            />
          </View>
        </TouchableOpacity>
      );
    });

  if (isAndroid) {
    return (
      <View
        style={[
          styles.wrapper,
          {
            paddingHorizontal: 14,
            paddingBottom: Math.max(insets.bottom, 10),
          },
        ]}
      >
        <View
          style={[
            styles.androidBar,
            {
              backgroundColor: glassFill,
              borderColor,
            },
          ]}
        >
          <LinearGradient
            colors={
              isDark
                ? ["rgba(255,255,255,0.10)", "transparent"]
                : ["rgba(255,255,255,0.78)", "transparent"]
            }
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gloss}
            pointerEvents="none"
          />

          <View
            pointerEvents="none"
            style={[styles.glassHighlight, { opacity: highlightOpacity }]}
          />

          <View style={styles.androidTabsContainer}>{renderTabs()}</View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <BlurView
        intensity={85}
        tint={glassTint}
        style={[
          styles.blurContainer,
          styles.iosContainer,
          {
            borderTopWidth: 1,
            borderColor,
          },
        ]}
      >
        <LinearGradient
          colors={
            isDark
              ? ["rgba(255,255,255,0.08)", "transparent"]
              : ["rgba(255,255,255,0.65)", "transparent"]
          }
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gloss}
          pointerEvents="none"
        />

        <View
          pointerEvents="none"
          style={[styles.glassHighlight, { opacity: highlightOpacity }]}
        />

        <View style={styles.container}>{renderTabs()}</View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },

  blurContainer: {
    overflow: "hidden",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "transparent",
  },

  iosContainer: {},

  androidBar: {
    overflow: "hidden",
    borderRadius: 24,
    borderWidth: 1,
    elevation: 28,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
  },

  gloss: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },

  container: {
    flexDirection: "row",
    height: 75,
    paddingBottom: Platform.OS === "ios" ? 20 : 12,
    paddingTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },

  androidTabsContainer: {
    flexDirection: "row",
    height: 78,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },

  glassHighlight: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 1.5,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },

  tab: {
    flex: 1,
    alignItems: "center",
  },

  iconContainer: {
    width: 64,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  androidIconContainer: {
    width: 64,
    height: 46,
    borderRadius: 23,
  },
});
