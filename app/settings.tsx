/**
 * Settings screen – Theme, Language, Notifications, Account
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LANGUAGE_OPTIONS, useTranslation } from "@/constants/i18n";
import { Fonts, Radius } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeMode, useAppStore } from "@/store/useAppStore";

const THEME_OPTIONS: {
  mode: ThemeMode;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { mode: "light", icon: "sunny-outline" },
  { mode: "dark", icon: "moon-outline" },
  { mode: "system", icon: "phone-portrait-outline" },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const { t } = useTranslation();

  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled);
  const toggleNotifications = useAppStore((s) => s.toggleNotifications);
  const reset = useAppStore((s) => s.reset);

  const [langModalVisible, setLangModalVisible] = useState(false);

  const themeLabels: Record<ThemeMode, string> = {
    light: t("lightMode"),
    dark: t("darkMode"),
    system: t("systemMode"),
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t("deleteAccount"),
      "Are you sure? This action cannot be undone.",
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("confirm"),
          style: "destructive",
          onPress: () => {
            reset();
            router.replace("/(auth)");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("settingsTitle")}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Appearance ── */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t("appearance")}
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? colors.border : "#F0F0F0",
            },
          ]}
        >
          {THEME_OPTIONS.map((opt) => {
            const active = themeMode === opt.mode;
            return (
              <Pressable
                key={opt.mode}
                style={[
                  styles.themeOption,
                  active && {
                    backgroundColor: colors.tint + "15",
                    borderColor: colors.tint,
                  },
                  !active && {
                    borderColor: isDark ? colors.border : "#E5E7EB",
                  },
                ]}
                onPress={() => setThemeMode(opt.mode)}
              >
                <Ionicons
                  name={opt.icon}
                  size={22}
                  color={active ? colors.tint : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.themeLabel,
                    { color: active ? colors.tint : colors.text },
                  ]}
                >
                  {themeLabels[opt.mode]}
                </Text>
                {active && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.tint}
                  />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* ── Language ── */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t("language")}
        </Text>
        <Pressable
          style={[
            styles.row,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? colors.border : "#F0F0F0",
            },
          ]}
          onPress={() => setLangModalVisible(true)}
        >
          <View
            style={[styles.rowIconBox, { backgroundColor: colors.tint + "12" }]}
          >
            <Ionicons name="language-outline" size={20} color={colors.tint} />
          </View>
          <Text style={[styles.rowLabel, { color: colors.text }]}>
            {t("language")}
          </Text>
          <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
            {LANGUAGE_OPTIONS.find((l) => l.code === language)?.label}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </Pressable>

        {/* ── Notifications ── */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t("notifications")}
        </Text>
        <View
          style={[
            styles.row,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? colors.border : "#F0F0F0",
            },
          ]}
        >
          <View
            style={[styles.rowIconBox, { backgroundColor: colors.tint + "12" }]}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.tint}
            />
          </View>
          <Text style={[styles.rowLabel, { color: colors.text }]}>
            {t("pushNotifications")}
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#767577", true: colors.tint + "60" }}
            thumbColor={notificationsEnabled ? colors.tint : "#f4f3f4"}
          />
        </View>

        {/* ── Account ── */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t("accountSettings")}
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? colors.border : "#F0F0F0",
            },
          ]}
        >
          {[
            {
              icon: "lock-closed-outline",
              label: t("changePassword"),
              onPress: () => {},
            },
            {
              icon: "shield-outline",
              label: t("privacyPolicy"),
              onPress: () => {},
            },
            {
              icon: "document-text-outline",
              label: t("termsConditions"),
              onPress: () => {},
            },
            {
              icon: "information-circle-outline",
              label: t("aboutApp"),
              onPress: () => {},
            },
          ].map((item) => (
            <Pressable
              key={item.label}
              style={styles.menuRow}
              onPress={item.onPress}
            >
              <View
                style={[
                  styles.rowIconBox,
                  { backgroundColor: colors.tint + "12" },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={colors.tint}
                />
              </View>
              <Text style={[styles.rowLabel, { color: colors.text }]}>
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.textSecondary}
              />
            </Pressable>
          ))}
        </View>

        {/* ── Delete Account ── */}
        <Pressable style={styles.deleteBtn} onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.deleteText}>{t("deleteAccount")}</Text>
        </Pressable>

        {/* ── Version ── */}
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          {t("version")} 1.0.0
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── Language Modal ── */}
      <Modal
        visible={langModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLangModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLangModalVisible(false)}
        >
          <Pressable
            style={[styles.modalContent, { backgroundColor: colors.card }]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("language")}
            </Text>
            {LANGUAGE_OPTIONS.map((opt) => {
              const active = language === opt.code;
              return (
                <Pressable
                  key={opt.code}
                  style={[
                    styles.langOption,
                    active && { backgroundColor: colors.tint + "12" },
                  ]}
                  onPress={() => {
                    setLanguage(opt.code);
                    setLangModalVisible(false);
                  }}
                >
                  <Text style={styles.langFlag}>{opt.flag}</Text>
                  <Text style={[styles.langLabel, { color: colors.text }]}>
                    {opt.label}
                  </Text>
                  {active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={colors.tint}
                    />
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  content: { paddingHorizontal: 20 },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: "hidden",
  },

  /* Theme selector */
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
  themeLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Fonts.sans,
  },

  /* Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.lg,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Fonts.sans,
  },
  rowValue: {
    fontSize: 14,
    marginRight: 8,
  },

  /* Menu row */
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },

  /* Delete */
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFF5F5",
  },
  deleteText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EF4444",
  },

  versionText: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 20,
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalContent: {
    width: "100%",
    borderRadius: Radius.lg,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: Fonts.sans,
  },
  langOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  langFlag: { fontSize: 24 },
  langLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.sans,
  },
});
