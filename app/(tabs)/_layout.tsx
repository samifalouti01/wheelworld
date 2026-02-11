import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { Platform } from "react-native";

import CustomTabBar from "@/components/Navigation/CustomTabBar";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // iOS: Native tabs with glass effect
  if (Platform.OS === "ios") {
    return (
      <NativeTabs
        minimizeBehavior="onScrollDown"
        iconColor={theme.tint}
        tintColor={theme.tint}
      >
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="dossier">
          <Label>Dossier</Label>
          <Icon sf="doc.text.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="diagnostics">
          <Label>Diagnostics</Label>
          <Icon sf="chart.bar.fill" />
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
      <Tabs.Screen name="dossier" />
      <Tabs.Screen name="diagnostics" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
