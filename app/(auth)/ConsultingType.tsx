/**
 * "What Type of Consulting you need?" – 6-card grid selector
 */
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import LegalFooter from "@/components/ui/LegalFooter";
import { Colors, Fonts, Radius } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const CONSULTING_TYPES = [
  {
    id: "strategy",
    label: "Strategy",
    desc: "Business growth & market entry",
    icon: "analytics-outline",
  },
  {
    id: "finance",
    label: "Finance",
    desc: "Banking & fintech advisory",
    icon: "cash-outline",
  },
  {
    id: "legal",
    label: "Legal",
    desc: "Compliance & regulatory",
    icon: "shield-checkmark-outline",
  },
  {
    id: "hr",
    label: "HR",
    desc: "Talent & workforce planning",
    icon: "people-outline",
  },
  {
    id: "tech",
    label: "Technology",
    desc: "Digital transformation",
    icon: "code-slash-outline",
  },
  {
    id: "energy",
    label: "Energy",
    desc: "Oil & renewables sector",
    icon: "flash-outline",
  },
] as const;

export default function ConsultingType() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    router.push("/(auth)/RegionalLocalization");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sheetWrapper}>
        <View
          style={[styles.card, { paddingBottom: Math.max(insets.bottom, 24) }]}
        >
          <View style={styles.header}>
            <Text style={styles.subtitle}>Consulting</Text>
            <Handle />
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.heading}>
              What Type of{"\n"}
              <Text style={styles.tint}>Consulting</Text> you need?
            </Text>

            <View style={styles.grid}>
              {CONSULTING_TYPES.map((item) => {
                const isSelected = selected.includes(item.id);
                return (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.typeCard,
                      isSelected && styles.typeCardSelected,
                    ]}
                    onPress={() => toggle(item.id)}
                  >
                    <View
                      style={[
                        styles.typeIcon,
                        isSelected && styles.typeIconSelected,
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={26}
                        color={isSelected ? "#fff" : Colors.light.tint}
                      />
                    </View>
                    <Text style={styles.typeLabel}>{item.label}</Text>
                    <Text style={styles.typeDesc}>{item.desc}</Text>

                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <PrimaryButton
              title="Continue  →"
              onPress={handleContinue}
              disabled={selected.length === 0}
            />
            <LegalFooter />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sheetWrapper: { flex: 1, justifyContent: "flex-end" },
  card: {
    width: "100%",
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  header: { alignItems: "center", marginBottom: 8 },
  subtitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  scroll: { flex: 1 },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 32,
    fontFamily: Fonts.sans,
  },
  tint: { color: Colors.light.tint },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
    width: "100%",
  },
  typeCard: {
    width: "47%",
    backgroundColor: "#F5F6F8",
    borderRadius: Radius.lg,
    padding: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  typeCardSelected: {
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.tint + "08",
  },
  typeIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.light.tint + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  typeIconSelected: {
    backgroundColor: Colors.light.tint,
  },
  typeLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
    fontFamily: Fonts.sans,
  },
  typeDesc: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    lineHeight: 15,
    fontFamily: Fonts.sans,
  },
  checkBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
  },
});
