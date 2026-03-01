/**
 * Schedule Consultation screen – calendar + time picker – dark mode aware
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts, Radius } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";

/* ── Calendar helpers ────────────────────────────────────── */
const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const MONTH = "October 2023";

const WEEKS = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
  "04:00 PM",
];

export default function ScheduleConsultation() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [selectedDay, setSelectedDay] = useState<number>(14);
  const [selectedTime, setSelectedTime] = useState<string>("10:30 AM");

  const surface = isDark ? colors.surface : "#F5F6F8";

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: surface }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Schedule Consultation
        </Text>
        <Pressable style={[styles.iconBtn, { backgroundColor: surface }]}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Expert info */}
        <View style={styles.expertRow}>
          <View style={styles.expertAvatar}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View>
            <Text style={[styles.expertName, { color: colors.text }]}>
              Amine K.
            </Text>
            <Text style={[styles.expertTitle, { color: colors.textSecondary }]}>
              Senior Strategist
            </Text>
            <Text style={{ fontSize: 12, color: colors.tint, marginTop: 2 }}>
              ● 100+ Sessions
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <Text style={[styles.sectionLabel, { color: colors.text }]}>
          Select Date
        </Text>
        <View style={styles.monthRow}>
          <Ionicons
            name="chevron-back"
            size={18}
            color={colors.textSecondary}
          />
          <Text style={[styles.monthText, { color: colors.text }]}>
            {MONTH}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </View>

        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((d) => (
            <Text
              key={d}
              style={[styles.weekdayText, { color: colors.textSecondary }]}
            >
              {d}
            </Text>
          ))}
        </View>

        {WEEKS.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((day, di) => {
              const isSelected = day === selectedDay;
              const isToday = day === 3;
              return (
                <Pressable
                  key={di}
                  style={[
                    styles.dayCell,
                    isSelected && { backgroundColor: colors.tint },
                    isToday &&
                      !isSelected && {
                        borderWidth: 1.5,
                        borderColor: colors.tint,
                      },
                  ]}
                  onPress={() => day && setSelectedDay(day)}
                  disabled={!day}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: colors.text },
                      isSelected && { color: "#fff", fontWeight: "700" },
                      !day && { opacity: 0 },
                    ]}
                  >
                    {day ?? ""}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}

        {/* Time slots */}
        <Text
          style={[styles.sectionLabel, { color: colors.text, marginTop: 20 }]}
        >
          Available Time
        </Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((t) => {
            const isActive = t === selectedTime;
            return (
              <Pressable
                key={t}
                style={[
                  styles.timeChip,
                  {
                    borderColor: isDark ? colors.border : "#E5E7EB",
                    backgroundColor: colors.card,
                  },
                  isActive && {
                    backgroundColor: colors.tint,
                    borderColor: colors.tint,
                  },
                ]}
                onPress={() => setSelectedTime(t)}
              >
                <Text
                  style={[
                    styles.timeChipText,
                    { color: colors.text },
                    isActive && { color: "#fff" },
                  ]}
                >
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Topic */}
        <Text
          style={[styles.sectionLabel, { color: colors.text, marginTop: 20 }]}
        >
          Topic (Optional)
        </Text>
        <View style={[styles.topicBox, { backgroundColor: surface }]}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={18}
            color={colors.textSecondary}
          />
          <TextInput
            style={[styles.topicInput, { color: colors.text }]}
            placeholder="Briefly describe what you'd like to discuss…"
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        {/* Summary */}
        <View style={[styles.summaryRow, { backgroundColor: surface }]}>
          <View>
            <Text
              style={[styles.summaryLabel, { color: colors.textSecondary }]}
            >
              Total Price
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              2000 DA
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={[styles.summaryLabel, { color: colors.textSecondary }]}
            >
              Duration
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              45 Minutes
            </Text>
          </View>
        </View>

        {/* Confirm */}
        <Pressable
          style={[styles.confirmBtn, { backgroundColor: colors.tint }]}
          onPress={() => router.push("/consultation/chat" as any)}
        >
          <Text style={styles.confirmBtnText}>Confirm Booking →</Text>
        </Pressable>
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
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", fontFamily: Fonts.sans },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  expertRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  expertAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2D3748",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  expertName: { fontSize: 18, fontWeight: "700", fontFamily: Fonts.sans },
  expertTitle: { fontSize: 13 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: Fonts.sans,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  monthText: { fontSize: 16, fontWeight: "600" },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
  },
  weekdayText: {
    width: 36,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  dayCell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: { fontSize: 14, fontWeight: "500" },
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
  },
  timeChipText: { fontSize: 14, fontWeight: "600" },
  topicBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 80,
  },
  topicInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    textAlignVertical: "top",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  summaryLabel: { fontSize: 12 },
  summaryValue: { fontSize: 18, fontWeight: "800", fontFamily: Fonts.sans },
  confirmBtn: { borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  confirmBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
