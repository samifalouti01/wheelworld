/**
 * Profile tab – dark mode, working links, skeleton loading
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Skeleton, { ProfileSkeleton } from "@/components/ui/Skeleton";

import { useTranslation } from "@/constants/i18n";
import { Fonts, Radius, Shadow } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppStore } from "@/store/useAppStore";

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const { t } = useTranslation();
  const user = useAppStore((s) => s.user);
  const reset = useAppStore((s) => s.reset);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const MENU_ITEMS: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  }[] = [
    {
      icon: "person-outline",
      label: t("editProfile"),
      onPress: () => router.push("/edit-profile" as any),
    },
    {
      icon: "document-text-outline",
      label: t("myReports"),
      onPress: () => router.push("/(tabs)/reports"),
    },
    {
      icon: "calendar-outline",
      label: t("myConsultations"),
      onPress: () => router.push("/(tabs)/experts"),
    },
    {
      icon: "card-outline",
      label: t("paymentMethods"),
      onPress: () => {},
    },
    {
      icon: "settings-outline",
      label: t("settings"),
      onPress: () => router.push("/settings" as any),
    },
    {
      icon: "help-circle-outline",
      label: t("helpSupport"),
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    reset();
    router.replace("/(auth)");
  };

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.brand, { color: colors.tint }]}>WHEELWORLD</Text>
          <Pressable
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
            ]}
            onPress={() => router.push("/settings" as any)}
          >
            <Ionicons name="settings-outline" size={22} color={colors.text} />
          </Pressable>
        </View>

        {loading ? (
          <>
            <ProfileSkeleton />
            <View style={{ paddingHorizontal: 0, marginBottom: 24 }}>
              <Skeleton width="100%" height={80} radius={20} />
            </View>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                width="100%"
                height={56}
                radius={12}
                style={{ marginBottom: 8 }}
              />
            ))}
          </>
        ) : (
          <>
            {/* Avatar + Name */}
            <View style={styles.profileSection}>
              <View
                style={[styles.avatarLarge, { backgroundColor: colors.tint }]}
              >
                <Ionicons name="person" size={40} color="#fff" />
              </View>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user.name}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {user.email}
              </Text>
              <View
                style={[
                  styles.planBadge,
                  { backgroundColor: colors.tint + "18" },
                ]}
              >
                <Text style={[styles.planText, { color: colors.tint }]}>
                  {t("premiumMember")}
                </Text>
              </View>
            </View>

            {/* Stats */}
            <View
              style={[
                styles.statsRow,
                { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
              ]}
            >
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  12
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  {t("reports")}
                </Text>
              </View>
              <View
                style={[
                  styles.statDivider,
                  { backgroundColor: isDark ? colors.border : "#DDD" },
                ]}
              />
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  8
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Consultations
                </Text>
              </View>
              <View
                style={[
                  styles.statDivider,
                  { backgroundColor: isDark ? colors.border : "#DDD" },
                ]}
              />
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  3
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Courses
                </Text>
              </View>
            </View>

            {/* Menu */}
            <View
              style={[
                styles.menuCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isDark ? colors.border : "#F0F0F0",
                },
              ]}
            >
              {MENU_ITEMS.map((item) => (
                <Pressable
                  key={item.label}
                  style={[
                    styles.menuRow,
                    { borderBottomColor: isDark ? colors.border : "#F5F6F8" },
                  ]}
                  onPress={item.onPress}
                >
                  <View
                    style={[
                      styles.menuIconBox,
                      { backgroundColor: colors.tint + "12" },
                    ]}
                  >
                    <Ionicons name={item.icon} size={20} color={colors.tint} />
                  </View>
                  <Text style={[styles.menuLabel, { color: colors.text }]}>
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

            {/* Logout */}
            <Pressable style={styles.logoutBtn} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.logoutText}>{t("logOut")}</Text>
            </Pressable>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  brand: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  profileSection: { alignItems: "center", marginBottom: 24 },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: Fonts.sans,
  },
  userEmail: { fontSize: 14, marginTop: 2 },
  planBadge: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  planText: {
    fontSize: 13,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "space-around",
  },
  statBox: { alignItems: "center", flex: 1 },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: Fonts.sans,
  },
  statLabel: { fontSize: 12, marginTop: 2 },
  statDivider: {
    width: 1,
    height: 32,
  },

  menuCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: "hidden",
    ...Shadow.card,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Fonts.sans,
  },

  logoutBtn: {
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
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EF4444",
  },
});
