/**
 * Company Details screen – company type, name, NIF
 */
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Handle from "@/components/Button/Handle";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DropdownField from "@/components/Form/DropdownField";
import InputField from "@/components/Form/InputField";
import LegalFooter from "@/components/ui/LegalFooter";
import { Colors, Fonts, Radius } from "@/constants/theme";

type CompanyFormData = {
  companyType: string;
  companyName: string;
  nif: string;
};

const COMPANY_TYPES = ["SARL", "SPA", "EURL", "SNC", "Startup", "Other"];

export default function CompanyDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    mode: "onChange",
    defaultValues: { companyType: "", companyName: "", nif: "" },
  });

  const onSubmit = (data: CompanyFormData) => {
    console.log("Company details:", data);
    router.push("/(auth)/ConsultingType");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      contentContainerStyle={styles.keyboardContent}
      keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
      enabled
    >
      <View style={styles.sheetWrapper}>
        <View
          style={[styles.card, { paddingBottom: Math.max(insets.bottom, 24) }]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Consulting</Text>
            <Handle />
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <Text style={styles.heading}>
              Company <Text style={styles.tint}>Details</Text>
            </Text>

            <Controller
              control={control}
              name="companyType"
              rules={{ required: "Company type is required" }}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  label="Company type"
                  value={value || undefined}
                  placeholder="e.g. SARL"
                  options={COMPANY_TYPES}
                  onChange={onChange}
                  error={errors.companyType?.message}
                  hasError={!!errors.companyType}
                />
              )}
            />

            <Controller
              control={control}
              name="companyName"
              rules={{ required: "Company name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Company Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter company name"
                  error={errors.companyName?.message}
                  hasError={!!errors.companyName}
                />
              )}
            />

            <Controller
              control={control}
              name="nif"
              rules={{ required: "NIF is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="NIF"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter NIF number"
                  keyboardType="number-pad"
                  error={errors.nif?.message}
                  hasError={!!errors.nif}
                />
              )}
            />

            <PrimaryButton
              title="Continue  →"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              loading={isSubmitting}
            />

            <LegalFooter />
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardContent: { flex: 1 },
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 24,
    fontFamily: Fonts.sans,
  },
  tint: { color: Colors.light.tint },
});
