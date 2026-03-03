/**
 * Global app store – Zustand + AsyncStorage persistence
 * Handles: theme mode, language, user profile
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";
export type Language = "en" | "fr" | "ar";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  plan: "free" | "premium";
  avatar?: string;
}

interface AppState {
  /* ── Theme ── */
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  /* ── Language ── */
  language: Language;
  setLanguage: (lang: Language) => void;

  /* ── User ── */
  user: UserProfile;
  setUser: (user: Partial<UserProfile>) => void;

  /* ── Onboarding data ── */
  accountType: "individual" | "company" | null;
  setAccountType: (type: "individual" | "company") => void;

  companyDetails: { type: string; name: string; nif: string } | null;
  setCompanyDetails: (d: { type: string; name: string; nif: string }) => void;

  consultingTypes: string[];
  setConsultingTypes: (types: string[]) => void;

  selectedRegion: string | null;
  setSelectedRegion: (region: string) => void;

  /* ── Notifications ── */
  notificationsEnabled: boolean;
  toggleNotifications: () => void;

  /* ── Reset ── */
  reset: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: "Ahmed Benali",
  email: "ahmed.benali@example.com",
  phone: "+213 555 0123",
  plan: "premium",
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      /* Theme */
      themeMode: "light",
      setThemeMode: (mode) => set({ themeMode: mode }),

      /* Language */
      language: "en",
      setLanguage: (lang) => set({ language: lang }),

      /* User */
      user: DEFAULT_USER,
      setUser: (partial) => set((s) => ({ user: { ...s.user, ...partial } })),

      /* Onboarding */
      accountType: null,
      setAccountType: (type) => set({ accountType: type }),

      companyDetails: null,
      setCompanyDetails: (d) => set({ companyDetails: d }),

      consultingTypes: [],
      setConsultingTypes: (types) => set({ consultingTypes: types }),

      selectedRegion: null,
      setSelectedRegion: (region) => set({ selectedRegion: region }),

      /* Notifications */
      notificationsEnabled: true,
      toggleNotifications: () =>
        set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),

      /* Reset */
      reset: () =>
        set({
          themeMode: "light",
          language: "en",
          user: DEFAULT_USER,
          accountType: null,
          companyDetails: null,
          consultingTypes: [],
          selectedRegion: null,
          notificationsEnabled: true,
        }),
    }),
    {
      name: "wheelworld-app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
