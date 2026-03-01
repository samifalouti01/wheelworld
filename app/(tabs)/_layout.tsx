import { useAppTheme } from "@/hooks/useAppTheme";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { Platform } from "react-native";

import CustomTabBar from "@/components/Navigation/CustomTabBar";

export default function TabLayout() {
  const { colors } = useAppTheme();

  // iOS: Native tabs with glass effect
  if (Platform.OS === "ios") {
    return (
      <NativeTabs
        minimizeBehavior="onScrollDown"
        iconColor={colors.tint}
        tintColor={colors.tint}
      >
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="experts">
          <Label>Experts</Label>
          <Icon sf="person.2.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="reports">
          <Label>Reports</Label>
          <Icon sf="doc.text.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
          <Label>Profile</Label>
          <Icon sf="person.fill" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Android: Custom glass tab bar
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="experts" />
      <Tabs.Screen name="reports" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
