/**
 * Expert detail / Recommended Experts screen – dark mode aware
 */
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts, Radius, Shadow } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";

/* ── Mock data ────────────────────────────────────────────── */
const FEATURED = {
  id: "1",
  name: "Dr. Amira Benali",
  title: "Financial Strategy",
  rating: 4.7,
  reviews: 156,
  available: true,
};

const EXPERTS_IN_STRATEGY = [
  {
    id: "2",
    name: "Nadia Khelif",
    title: "Tax Law & Compliance",
    rating: 4.5,
    reviews: 73,
  },
  {
    id: "3",
    name: "Yacine Bouzidi",
    title: "Mergers & Acquisitions",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: "4",
    name: "Sarah Mansouri",
    title: "Digital Transformation",
    rating: 4.8,
    reviews: 200,
  },
];

export default function ExpertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  void id;

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => router.back()}
          style={[
            styles.backBtn,
            { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
          ]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Pressable
          style={[
            styles.iconBtn,
            { backgroundColor: isDark ? colors.surface : "#F5F6F8" },
          ]}
        >
          <Ionicons name="funnel-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.topLabel, { color: colors.textSecondary }]}>
          Strategic Consulting
        </Text>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Recommended <Text style={{ color: colors.tint }}>Experts</Text>
        </Text>

        {/* Featured expert card */}
        <View
          style={[
            styles.featuredCard,
            {
              backgroundColor: colors.card,
              borderColor: isDark ? colors.border : "#F0F0F0",
            },
          ]}
        >
          <View style={styles.featuredTop}>
            <View style={styles.avatarLg}>
              <Ionicons name="person" size={30} color="#fff" />
            </View>
            <View style={styles.featuredInfo}>
              <Text style={[styles.featuredName, { color: colors.text }]}>
                {FEATURED.name}
              </Text>
              <Text
                style={[styles.featuredTitle, { color: colors.textSecondary }]}
              >
                {FEATURED.title}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={[styles.ratingText, { color: colors.text }]}>
                  {FEATURED.rating}
                </Text>
              </View>
              <View style={styles.availRow}>
                <View
                  style={[styles.greenDot, { backgroundColor: colors.tint }]}
                />
                <Text style={{ fontSize: 12, color: colors.tint }}>
                  Available till 6:00 PM
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={[styles.bookBtn, { backgroundColor: colors.tint }]}
            onPress={() => router.push("/consultation/schedule" as any)}
          >
            <Text style={styles.bookBtnText}>Book Consultation</Text>
          </Pressable>
        </View>

        {/* Experts in Strategy */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>
            Experts in Strategy
          </Text>
          <Text style={{ fontSize: 13, color: colors.tint, fontWeight: "600" }}>
            Sort by ▼
          </Text>
        </View>

        {EXPERTS_IN_STRATEGY.map((exp) => (
          <Pressable
            key={exp.id}
            style={[
              styles.expertRow,
              { borderBottomColor: isDark ? colors.border : "#F5F6F8" },
            ]}
          >
            <View style={styles.avatarSm}>
              <Ionicons name="person" size={22} color="#fff" />
            </View>
            <View style={styles.expertRowInfo}>
              <Text style={[styles.expertRowName, { color: colors.text }]}>
                {exp.name}
              </Text>
              <Text
                style={[styles.expertRowTitle, { color: colors.textSecondary }]}
              >
                {exp.title}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                  {exp.rating} ({exp.reviews} reviews)
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
            />
          </Pressable>
        ))}
      </ScrollView>
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
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  topLabel: { fontSize: 14, marginBottom: 2 },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    fontFamily: Fonts.sans,
  },

  featuredCard: {
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
    ...Shadow.card,
  },
  featuredTop: { flexDirection: "row", marginBottom: 14 },
  avatarLg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2D3748",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  featuredInfo: { flex: 1 },
  featuredName: { fontSize: 19, fontWeight: "700", fontFamily: Fonts.sans },
  featuredTitle: { fontSize: 13, marginTop: 2 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  ratingText: { fontSize: 14, fontWeight: "700" },
  availRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  greenDot: { width: 8, height: 8, borderRadius: 4 },
  bookBtn: { borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  bookBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeading: { fontSize: 18, fontWeight: "700", fontFamily: Fonts.sans },

  expertRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  avatarSm: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#2D3748",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  expertRowInfo: { flex: 1 },
  expertRowName: { fontSize: 16, fontWeight: "700", fontFamily: Fonts.sans },
  expertRowTitle: { fontSize: 13, marginTop: 1 },
});
