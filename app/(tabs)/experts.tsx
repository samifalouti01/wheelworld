/**
 * Experts tab – dark mode + skeleton loading
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ExpertCardSkeleton } from "@/components/ui/Skeleton";
import { useTranslation } from "@/constants/i18n";
import { Fonts, Radius, Shadow } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";

/* ── Mock data ────────────────────────────────────────────── */
const FILTERS = [
  "All Experts",
  "Strategy",
  "Legal",
  "Finance",
  "Tech",
  "Energy",
];

type Expert = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  tags: string[];
  available: boolean;
};

const EXPERTS: Expert[] = [
  {
    id: "1",
    name: "Amine Khellil",
    title: "Senior Strategy Consultant",
    rating: 4.9,
    reviews: 124,
    tags: ["Market Entry", "Growth", "Energy Sector"],
    available: true,
  },
  {
    id: "2",
    name: "Sarah Boumedienne",
    title: "Corporate Law Specialist",
    rating: 5.0,
    reviews: 87,
    tags: ["M&A", "Contracts", "Tech Law"],
    available: false,
  },
  {
    id: "3",
    name: "Karim Zeroual",
    title: "Financial Advisor",
    rating: 4.8,
    reviews: 210,
    tags: ["Banking", "Investment", "Fintech"],
    available: true,
  },
  {
    id: "4",
    name: "Dr. Amira Benali",
    title: "Financial Strategy",
    rating: 4.7,
    reviews: 156,
    tags: ["Compliance", "Risk", "Audit"],
    available: true,
  },
];

/* ── Component ────────────────────────────────────────────── */
export default function ExpertsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("All Experts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const renderExpert = ({ item }: { item: Expert }) => (
    <View
      style={[
        styles.expertCard,
        {
          backgroundColor: colors.card,
          borderColor: isDark ? colors.border : "#F0F0F0",
        },
      ]}
    >
      <View style={styles.expertTop}>
        <View style={styles.expertAvatar}>
          <Ionicons name="person" size={28} color="#fff" />
        </View>
        <View style={styles.expertInfo}>
          <View style={styles.expertNameRow}>
            <Text style={[styles.expertName, { color: colors.text }]}>
              {item.name}
            </Text>
            {item.available && (
              <View
                style={[
                  styles.availBadge,
                  { backgroundColor: colors.tint + "15" },
                ]}
              >
                <Text style={[styles.availText, { color: colors.tint }]}>
                  {t("availableNow")}
                </Text>
              </View>
            )}
            {!item.available && (
              <View style={[styles.availBadge, styles.busyBadge]}>
                <Text style={[styles.availText, { color: "#EF4444" }]}>
                  {t("busy")}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.expertTitle, { color: colors.textSecondary }]}>
            {item.title}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {item.tags.map((tag) => (
          <View
            key={tag}
            style={[
              styles.tag,
              { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
            ]}
          >
            <Text
              style={[
                styles.tagText,
                { color: isDark ? colors.textSecondary : "#555" },
              ]}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Action */}
      <Pressable
        style={[
          styles.bookBtn,
          { backgroundColor: colors.tint },
          !item.available && {
            backgroundColor: "transparent",
            borderWidth: 1.5,
            borderColor: colors.tint,
          },
        ]}
        onPress={() =>
          item.available
            ? router.push(`/consultation/schedule` as any)
            : router.push(`/expert/${item.id}` as any)
        }
      >
        <Text
          style={[
            styles.bookBtnText,
            !item.available && { color: colors.tint },
          ]}
        >
          {item.available ? t("bookConsultation") : t("viewProfile")}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.brand, { color: colors.tint }]}>WHEELWORLD</Text>
        <View style={styles.headerRight}>
          <Pressable
            style={[
              styles.iconBtn,
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
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
            ]}
          >
            <Ionicons name="filter-outline" size={22} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.titleRow}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          {t("eliteExperts")}
        </Text>
        <Pressable style={styles.filterIconBtn}>
          <Ionicons name="options-outline" size={20} color={colors.tint} />
          <Text style={[styles.filterLabel, { color: colors.tint }]}>
            {t("filters")}
          </Text>
        </Pressable>
      </View>

      {/* Search */}
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
          placeholder={t("searchExperts")}
          placeholderTextColor={colors.textSecondary}
        />
        <Ionicons name="mic-outline" size={20} color={colors.textSecondary} />
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {FILTERS.map((f) => {
          const active = f === activeFilter;
          return (
            <Pressable
              key={f}
              style={[
                styles.chip,
                {
                  borderColor: isDark ? colors.border : "#E5E7EB",
                  backgroundColor: isDark ? colors.surface : "#fff",
                },
                active && {
                  backgroundColor: colors.tint,
                  borderColor: colors.tint,
                },
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: colors.text },
                  active && { color: "#fff" },
                ]}
              >
                {f}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Expert list */}
      {loading ? (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <ExpertCardSkeleton />
          <ExpertCardSkeleton />
          <ExpertCardSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={EXPERTS}
          keyExtractor={(e) => e.id}
          renderItem={renderExpert}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {t("showing")} {EXPERTS.length} {t("of")} 150+{" "}
              {t("expertsSuffix")}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

/* ── Styles ────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  brand: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  headerRight: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    fontFamily: Fonts.sans,
  },
  filterIconBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  chipsRow: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  chipActive: {},
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: { color: "#fff" },

  listContent: { paddingHorizontal: 20, paddingBottom: 120 },

  expertCard: {
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    marginBottom: 14,
    ...Shadow.card,
  },
  expertTop: { flexDirection: "row", marginBottom: 12 },
  expertAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#2D3748",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  expertInfo: { flex: 1 },
  expertNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  expertName: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  availBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  busyBadge: { backgroundColor: "#FEE2E2" },
  availText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  expertTitle: { fontSize: 13, marginTop: 2 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  ratingText: { fontSize: 13 },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: { fontSize: 12, fontWeight: "500" },
  bookBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  viewProfileBtn: {},
  viewProfileBtnText: {},
  footerText: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 24,
  },
});
