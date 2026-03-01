/**
 * Edit Profile screen
 */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "@/constants/i18n";
import { Fonts, Radius } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppStore } from "@/store/useAppStore";

export default function EditProfileScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const { t } = useTranslation();

  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = () => {
    setUser({ name, email, phone });
    Alert.alert("Profile Updated", "Your profile has been saved.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const inputBg = isDark ? colors.surface : "#F5F6F8";
  const inputBorder = isDark ? colors.border : "#E5E7EB";

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
          {t("editProfileTitle")}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View
              style={[styles.avatarCircle, { backgroundColor: colors.tint }]}
            >
              <Ionicons name="person" size={40} color="#fff" />
            </View>
            <Pressable
              style={[styles.editAvatarBtn, { backgroundColor: colors.tint }]}
            >
              <Ionicons name="camera-outline" size={16} color="#fff" />
            </Pressable>
          </View>

          {/* Fields */}
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            {t("fullName")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: inputBorder,
                color: colors.text,
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder={t("fullName")}
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            {t("email")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: inputBorder,
                color: colors.text,
              },
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder={t("email")}
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            {t("phone")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: inputBorder,
                color: colors.text,
              },
            ]}
            value={phone}
            onChangeText={setPhone}
            placeholder={t("phone")}
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />

          {/* Save */}
          <Pressable
            style={[styles.saveBtn, { backgroundColor: colors.tint }]}
            onPress={handleSave}
          >
            <Text style={styles.saveBtnText}>{t("saveChanges")}</Text>
          </Pressable>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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

  avatarSection: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: Fonts.sans,
  },

  saveBtn: {
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
});
