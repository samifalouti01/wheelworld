/**
 * "Who Are you?" – Account type selection screen
 */
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import LegalFooter from "@/components/ui/LegalFooter";
import { Colors, Fonts, Radius } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

type AccountTypeOption = "Individual" | "Company";

const OPTIONS: {
  value: AccountTypeOption;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}[] = [
  {
    value: "Individual",
    icon: "person-outline",
    title: "Individual",
    description:
      "Looking for consultant, freelancers, or students looking for strategic insights",
  },
  {
    value: "Company",
    icon: "business-outline",
    title: "Company",
    description:
      "For registered businesses seeking market data and corporate solutions",
  },
];

export default function AccountType() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<AccountTypeOption | null>(null);

  const handleContinue = () => {
    if (selected === "Company") {
      router.push("/(auth)/CompanyDetails");
    } else {
      router.push("/(auth)/ConsultingType");
    }
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

          <View style={styles.content}>
            <Text style={styles.heading}>
              Who Are <Text style={styles.tint}>you?</Text>
            </Text>

            <View style={styles.optionsContainer}>
              {OPTIONS.map((opt) => {
                const isSelected = selected === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                    ]}
                    onPress={() => setSelected(opt.value)}
                  >
                    <View style={styles.optionLeft}>
                      <View
                        style={[
                          styles.iconBox,
                          isSelected && styles.iconBoxSelected,
                        ]}
                      >
                        <Ionicons
                          name={opt.icon}
                          size={24}
                          color={isSelected ? "#fff" : Colors.light.tint}
                        />
                      </View>
                      <View style={styles.optionTextBlock}>
                        <Text style={styles.optionTitle}>{opt.title}</Text>
                        <Text style={styles.optionDesc} numberOfLines={2}>
                          {opt.description}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[styles.radio, isSelected && styles.radioSelected]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.bottom}>
              <PrimaryButton
                title="Continue  →"
                onPress={handleContinue}
                disabled={!selected}
              />
              <LegalFooter />
            </View>
          </View>
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
  content: { flex: 1 },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: Fonts.sans,
  },
  tint: { color: Colors.light.tint },
  optionsContainer: { gap: 16 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: Radius.lg,
    padding: 16,
    backgroundColor: "#fff",
  },
  optionCardSelected: {
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.tint + "08",
  },
  optionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.light.tint + "18",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconBoxSelected: {
    backgroundColor: Colors.light.tint,
  },
  optionTextBlock: { flex: 1, marginRight: 8 },
  optionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 2,
    fontFamily: Fonts.sans,
  },
  optionDesc: {
    fontSize: 12,
    color: "#888",
    lineHeight: 16,
    fontFamily: Fonts.sans,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CCC",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: Colors.light.tint },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.tint,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
