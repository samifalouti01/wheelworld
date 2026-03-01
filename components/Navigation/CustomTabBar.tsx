import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTranslation } from "@/constants/i18n";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";

const TAB_META: Record<
  string,
  {
    icon: keyof typeof Ionicons.glyphMap;
    iconFocused: keyof typeof Ionicons.glyphMap;
    labelKey: "home" | "experts" | "reports" | "profile";
  }
> = {
  index: { icon: "home-outline", iconFocused: "home", labelKey: "home" },
  experts: {
    icon: "people-outline",
    iconFocused: "people",
    labelKey: "experts",
  },
  reports: {
    icon: "document-text-outline",
    iconFocused: "document-text",
    labelKey: "reports",
  },
  profile: {
    icon: "person-outline",
    iconFocused: "person",
    labelKey: "profile",
  },
};

function TabItem({
  route,
  isFocused,
  onPress,
}: {
  route: string;
  isFocused: boolean;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const meta = TAB_META[route] ?? TAB_META.index;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isFocused ? 1 : 0.92, { damping: 15 }) }],
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.tab}>
      <Animated.View
        style={[
          styles.pill,
          isFocused && {
            backgroundColor: colors.tint + "18",
          },
          animatedStyle,
        ]}
      >
        <Ionicons
          name={isFocused ? meta.iconFocused : meta.icon}
          size={22}
          color={isFocused ? colors.tint : colors.tabIconDefault}
        />
        {isFocused && (
          <Text
            style={[styles.label, { color: colors.tint }]}
            numberOfLines={1}
          >
            {t(meta.labelKey)}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          paddingHorizontal: 12,
        },
      ]}
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: isDark
              ? "rgba(24,26,28,0.96)"
              : "rgba(255,255,255,0.97)",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            ...(Platform.OS === "android"
              ? { elevation: 20 }
              : {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: -4 },
                  shadowOpacity: isDark ? 0.4 : 0.1,
                  shadowRadius: 16,
                }),
          },
        ]}
      >
        {state.routes.map((route, index) => (
          <TabItem
            key={route.key}
            route={route.name}
            isFocused={state.index === index}
            onPress={() => {
              if (state.index !== index) {
                navigation.navigate(route.name);
              }
            }}
          />
        ))}
      </View>
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
  bar: {
    flexDirection: "row",
    borderRadius: 28,
    borderWidth: 1,
    height: 64,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
});
