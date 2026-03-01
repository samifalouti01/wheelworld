/**
 * Reports tab – dark mode + skeleton loading
 */
import { Ionicons } from "@expo/vector-icons";
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

import { CardSkeleton } from "@/components/ui/Skeleton";
import { useTranslation } from "@/constants/i18n";
import { Fonts, Radius, Shadow } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";

const CATEGORIES = ["All", "Strategy", "Finance", "Economy", "Energy", "Legal"];

type Report = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  views: string;
  premium: boolean;
};

const REPORTS: Report[] = [
  {
    id: "1",
    title: "Q4 2023: Digital Transformation in North Africa",
    category: "Strategy",
    readTime: "15 min",
    views: "2.4k",
    premium: true,
  },
  {
    id: "2",
    title: "Algerian Fintech Landscape 2024",
    category: "Finance",
    readTime: "12 min",
    views: "1.8k",
    premium: false,
  },
  {
    id: "3",
    title: "Energy Sector Outlook: North Africa",
    category: "Energy",
    readTime: "20 min",
    views: "3.1k",
    premium: true,
  },
  {
    id: "4",
    title: "Market Entry Guide: Algeria",
    category: "Strategy",
    readTime: "18 min",
    views: "2.0k",
    premium: false,
  },
  {
    id: "5",
    title: "GDP Growth Analysis Q1 2024",
    category: "Economy",
    readTime: "10 min",
    views: "950",
    premium: false,
  },
];

export default function ReportsScreen() {
  const { colors, isDark } = useAppTheme();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filtered =
    activeFilter === "All"
      ? REPORTS
      : REPORTS.filter((r) => r.category === activeFilter);

  const renderReport = ({ item }: { item: Report }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isDark ? colors.border : "#F0F0F0",
        },
      ]}
    >
      <View style={styles.cardImagePlaceholder}>
        {item.premium && (
          <View style={[styles.premiumBadge, { backgroundColor: colors.tint }]}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <View
          style={[
            styles.catBadge,
            { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
          ]}
        >
          <Text
            style={[
              styles.catText,
              { color: isDark ? colors.textSecondary : "#555" },
            ]}
          >
            {item.category}
          </Text>
        </View>
        <Text
          style={[styles.cardTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>
          📖 {item.readTime} read · 👁 {item.views} views
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.brand, { color: colors.tint }]}>WHEELWORLD</Text>
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
      </View>

      <Text style={[styles.pageTitle, { color: colors.text }]}>
        {t("marketReports").split(" ")[0]}{" "}
        <Text style={{ color: colors.tint }}>
          {t("marketReports").split(" ").slice(1).join(" ")}
        </Text>
      </Text>

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
          placeholder={t("searchReports")}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {CATEGORIES.map((c) => {
          const active = c === activeFilter;
          return (
            <Pressable
              key={c}
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
              onPress={() => setActiveFilter(c)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: colors.text },
                  active && { color: "#fff" },
                ]}
              >
                {c}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {loading ? (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(r) => r.id}
          renderItem={renderReport}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

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
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
    fontFamily: Fonts.sans,
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
  chipsRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  chipActive: {},
  chipText: { fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  listContent: { paddingHorizontal: 20, paddingBottom: 120 },
  card: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 14,
    ...Shadow.card,
  },
  cardImagePlaceholder: {
    height: 120,
    backgroundColor: "#2D3748",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingLeft: 10,
  },
  premiumBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  cardBody: { padding: 14 },
  catBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  catText: { fontSize: 11, fontWeight: "600" },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 21,
    fontFamily: Fonts.sans,
  },
  meta: { fontSize: 12 },
});
