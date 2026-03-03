/**
 * Home / Strategic Insights dashboard – dark mode + skeleton loading
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Skeleton, { CardSkeleton, HomeCategorySkeleton } from "@/components/ui/Skeleton";
import { useTranslation } from "@/constants/i18n";
import { Fonts, Radius, Shadow } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppStore } from "@/store/useAppStore";

/* ── Category data ──────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "economy",
    label: "Economy",
    desc: "GDP & Market Data",
    icon: "trending-up-outline" as const,
    color: "#6366F1",
    badge: "+2.4% Growth ↗",
    badgeColor: "#10B981",
  },
  {
    id: "finance",
    label: "Finance",
    desc: "Banking & Fintech",
    icon: "cash-outline" as const,
    color: "#8B5CF6",
  },
  {
    id: "strategy",
    label: "Strategy",
    desc: "Market Entry",
    icon: "bulb-outline" as const,
    color: "#F59E0B",
  },
  {
    id: "energy",
    label: "Energy",
    desc: "Oil & Renewables",
    icon: "flash-outline" as const,
    color: "#10B981",
    badge: "High Activity",
    badgeColor: "#10B981",
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const { t } = useTranslation();
  const user = useAppStore((s) => s.user);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <Pressable>
            <Ionicons name="menu-outline" size={26} color={colors.text} />
          </Pressable>
          <Text style={[styles.brand, { color: colors.tint }]}>WHEELWORLD</Text>
          <View style={styles.headerRight}>
            <Pressable
              style={[
                styles.notifBtn,
                { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.text}
              />
            </Pressable>
            <Pressable
              style={[styles.avatar, { backgroundColor: colors.tint }]}
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Ionicons name="person" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* ── Welcome ── */}
        <Text style={[styles.welcomeSmall, { color: colors.textSecondary }]}>
          {t("welcomeBack")}
        </Text>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("strategicInsights").split(" ")[0]}{" "}
          <Text style={{ color: colors.tint }}>
            {t("strategicInsights").split(" ").slice(1).join(" ")}
          </Text>
        </Text>

        {/* ── Search ── */}
        <View
          style={[
            styles.searchBar,
            { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.textSecondary}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t("searchPlaceholder")}
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {loading ? (
          <>
            <HomeCategorySkeleton />
            <View style={{ marginTop: 28 }}>
              <Skeleton
                width={160}
                height={22}
                radius={8}
                style={{ marginBottom: 12 }}
              />
              <CardSkeleton />
            </View>
          </>
        ) : (
          <>
            {/* ── Category grid ── */}
            <View style={styles.grid}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.catCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isDark ? colors.border : "#F0F0F0",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.catIcon,
                      { backgroundColor: cat.color + "18" },
                    ]}
                  >
                    <Ionicons name={cat.icon} size={22} color={cat.color} />
                  </View>
                  <Text style={[styles.catLabel, { color: colors.text }]}>
                    {cat.label}
                  </Text>
                  <Text
                    style={[styles.catDesc, { color: colors.textSecondary }]}
                  >
                    {cat.desc}
                  </Text>

                  {cat.badge && (
                    <View
                      style={[
                        styles.catBadge,
                        { backgroundColor: cat.badgeColor + "18" },
                      ]}
                    >
                      <Text
                        style={[styles.catBadgeText, { color: cat.badgeColor }]}
                      >
                        {cat.badge}
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>

            {/* ── Featured Report ── */}
            <View style={styles.sectionRow}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>
                {t("featuredReport")}
              </Text>
              <Pressable onPress={() => router.push("/(tabs)/reports")}>
                <Text style={[styles.viewAll, { color: colors.tint }]}>
                  {t("viewAll")}
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.reportCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isDark ? colors.border : "#F0F0F0",
                },
              ]}
            >
              <View style={styles.reportImagePlaceholder}>
                <View
                  style={[
                    styles.premiumBadge,
                    { backgroundColor: colors.tint },
                  ]}
                >
                  <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
              </View>
              <View style={styles.reportBody}>
                <Text style={[styles.reportTitle, { color: colors.text }]}>
                  Q4 2023: Digital Transformation in North Africa
                </Text>
                <Text
                  style={[styles.reportMeta, { color: colors.textSecondary }]}
                >
                  📖 15 min read · 👁 2.4k views
                </Text>
                <Text
                  style={[styles.reportDesc, { color: colors.textSecondary }]}
                  numberOfLines={2}
                >
                  Comprehensive analysis of the shifting digital landscape in
                  Algeria and neighboring markets…
                </Text>
                <Pressable
                  style={[styles.readBtn, { backgroundColor: colors.tint }]}
                >
                  <Text style={styles.readBtnText}>{t("readFullReport")}</Text>
                </Pressable>
              </View>
            </View>

            {/* ── Your Progress ── */}
            <Text style={[styles.sectionHeading, { color: colors.text }]}>
              {t("yourProgress")}
            </Text>
            <View
              style={[
                styles.progressCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isDark ? colors.border : "#F0F0F0",
                },
              ]}
            >
              <View style={styles.progressLeft}>
                <View
                  style={[styles.progressCircle, { borderColor: colors.tint }]}
                >
                  <Text
                    style={[styles.progressPercent, { color: colors.tint }]}
                  >
                    75%
                  </Text>
                </View>
              </View>
              <View style={styles.progressRight}>
                <Text style={[styles.progressTitle, { color: colors.text }]}>
                  Strategic Planning Module
                </Text>
                <Text
                  style={[styles.progressSub, { color: colors.textSecondary }]}
                >
                  3 of 4 lessons completed
                </Text>
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: isDark ? colors.border : "#E5E7EB" },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBar,
                      { backgroundColor: colors.tint },
                    ]}
                  />
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={{ marginLeft: 8 }}
              />
            </View>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Styles ──────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  brand: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: Fonts.sans,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Welcome */
  welcomeSmall: { fontSize: 14, marginBottom: 2 },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    fontFamily: Fonts.sans,
  },

  /* Search */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  /* Grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 28,
  },
  catCard: {
    width: "47%",
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    ...Shadow.card,
  },
  catIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  catLabel: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  catDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  catBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  catBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  /* Featured Report */
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: Fonts.sans,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  reportCard: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 28,
    ...Shadow.card,
  },
  reportImagePlaceholder: {
    height: 160,
    backgroundColor: "#2D3748",
    justifyContent: "flex-start",
    paddingTop: 12,
    paddingLeft: 12,
  },
  premiumBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  reportBody: { padding: 16 },
  reportTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 22,
    fontFamily: Fonts.sans,
  },
  reportMeta: {
    fontSize: 12,
    marginBottom: 8,
  },
  reportDesc: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  readBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  readBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  /* Progress */
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    marginTop: 12,
    ...Shadow.card,
  },
  progressLeft: { marginRight: 14 },
  progressCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "800",
  },
  progressRight: { flex: 1 },
  progressTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  progressSub: {
    fontSize: 12,
    marginVertical: 4,
  },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    width: "75%",
    height: "100%",
    borderRadius: 3,
  },
});
