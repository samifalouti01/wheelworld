/**
 * Regional Localization – select region / country
 */
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import LegalFooter from "@/components/ui/LegalFooter";
import { Colors, Fonts, Radius } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

type Region = { id: string; name: string; flag: string };

const RECOMMENDED: Region[] = [{ id: "dz", name: "Algeria", flag: "🇩🇿" }];

const OTHER_REGIONS: Region[] = [
  { id: "tn", name: "Tunisia", flag: "🇹🇳" },
  { id: "ma", name: "Morocco", flag: "🇲🇦" },
  { id: "ly", name: "Libya", flag: "🇱🇾" },
  { id: "eg", name: "Egypt", flag: "🇪🇬" },
];

export default function RegionalLocalization() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>("dz");
  const [search, setSearch] = useState("");

  const filteredOther = OTHER_REGIONS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleContinue = () => {
    router.push("/(auth)/Finalizing");
  };

  const renderRegion = (region: Region) => {
    const isSelected = selected === region.id;
    return (
      <Pressable
        key={region.id}
        style={[styles.regionRow, isSelected && styles.regionRowSelected]}
        onPress={() => setSelected(region.id)}
      >
        <View style={styles.regionLeft}>
          <View style={styles.flagBox}>
            <Text style={styles.flag}>{region.flag}</Text>
          </View>
          <Text style={styles.regionName}>{region.name}</Text>
        </View>

        {isSelected ? (
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        ) : (
          <View style={styles.emptyCircle} />
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sheetWrapper}>
        <View
          style={[styles.card, { paddingBottom: Math.max(insets.bottom, 24) }]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Consulting</Text>
            <Handle />
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.heading}>
              Regional <Text style={styles.tint}>Localization</Text>
            </Text>

            {/* Search bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={18} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search region or country"
                placeholderTextColor="#999"
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Recommended */}
            <Text style={styles.sectionLabel}>Recommended</Text>
            {RECOMMENDED.map(renderRegion)}

            {/* Other Regions */}
            <Text style={[styles.sectionLabel, { marginTop: 16 }]}>
              Other Regions
            </Text>
            {filteredOther.map(renderRegion)}

            <View style={{ height: 24 }} />

            <PrimaryButton title="Continue  →" onPress={handleContinue} />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Fonts.sans,
  },
  tint: { color: Colors.light.tint },

  /* Search */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6F8",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },

  /* Section */
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 10,
    fontFamily: Fonts.sans,
  },

  /* Region row */
  regionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#F5F6F8",
    marginBottom: 8,
  },
  regionRowSelected: {
    backgroundColor: Colors.light.tint + "10",
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
  },
  regionLeft: { flexDirection: "row", alignItems: "center" },
  flagBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  flag: { fontSize: 20 },
  regionName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#CCC",
  },
});
