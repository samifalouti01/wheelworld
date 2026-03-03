/**
 * i18n – lightweight translation system
 */
import { Language, useAppStore } from "@/store/useAppStore";

type TranslationKey = keyof typeof translations.en;

const translations = {
  en: {
    /* Tabs */
    home: "Home",
    experts: "Experts",
    reports: "Reports",
    profile: "Profile",

    /* Home */
    welcomeBack: "Welcome back.",
    strategicInsights: "Strategic Insights",
    searchPlaceholder: "Search markets, trends, or reports…",
    featuredReport: "Featured Report",
    viewAll: "View All",
    yourProgress: "Your Progress",
    readFullReport: "Read Full Report →",

    /* Experts */
    eliteExperts: "Elite Experts",
    filters: "Filters",
    searchExperts: "Search consultants, skills…",
    bookConsultation: "Book Consultation",
    viewProfile: "View Profile",
    availableNow: "AVAILABLE NOW",
    busy: "BUSY",
    showing: "Showing",
    of: "of",
    expertsSuffix: "Experts",

    /* Reports */
    marketReports: "Market Reports",
    searchReports: "Search reports…",

    /* Profile */
    premiumMember: "Premium Member",
    editProfile: "Edit Profile",
    myReports: "My Reports",
    myConsultations: "My Consultations",
    paymentMethods: "Payment Methods",
    settings: "Settings",
    helpSupport: "Help & Support",
    logOut: "Log Out",

    /* Settings */
    settingsTitle: "Settings",
    appearance: "Appearance",
    lightMode: "Light",
    darkMode: "Dark",
    systemMode: "System",
    language: "Language",
    english: "English",
    french: "Français",
    arabic: "العربية",
    notifications: "Notifications",
    pushNotifications: "Push Notifications",
    accountSettings: "Account",
    changePassword: "Change Password",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    aboutApp: "About App",
    deleteAccount: "Delete Account",
    version: "Version",

    /* Edit Profile */
    editProfileTitle: "Edit Profile",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    saveChanges: "Save Changes",

    /* General */
    cancel: "Cancel",
    save: "Save",
    confirm: "Confirm",
    back: "Back",
  },

  fr: {
    home: "Accueil",
    experts: "Experts",
    reports: "Rapports",
    profile: "Profil",
    welcomeBack: "Bon retour.",
    strategicInsights: "Aperçus Stratégiques",
    searchPlaceholder: "Rechercher marchés, tendances…",
    featuredReport: "Rapport en Vedette",
    viewAll: "Voir Tout",
    yourProgress: "Votre Progrès",
    readFullReport: "Lire le Rapport Complet →",
    eliteExperts: "Experts Élite",
    filters: "Filtres",
    searchExperts: "Rechercher consultants…",
    bookConsultation: "Réserver Consultation",
    viewProfile: "Voir le Profil",
    availableNow: "DISPONIBLE",
    busy: "OCCUPÉ",
    showing: "Affichage",
    of: "de",
    expertsSuffix: "Experts",
    marketReports: "Rapports de Marché",
    searchReports: "Rechercher rapports…",
    premiumMember: "Membre Premium",
    editProfile: "Modifier le Profil",
    myReports: "Mes Rapports",
    myConsultations: "Mes Consultations",
    paymentMethods: "Moyens de Paiement",
    settings: "Paramètres",
    helpSupport: "Aide & Support",
    logOut: "Déconnexion",
    settingsTitle: "Paramètres",
    appearance: "Apparence",
    lightMode: "Clair",
    darkMode: "Sombre",
    systemMode: "Système",
    language: "Langue",
    english: "English",
    french: "Français",
    arabic: "العربية",
    notifications: "Notifications",
    pushNotifications: "Notifications Push",
    accountSettings: "Compte",
    changePassword: "Changer le Mot de Passe",
    privacyPolicy: "Politique de Confidentialité",
    termsConditions: "Conditions Générales",
    aboutApp: "À Propos",
    deleteAccount: "Supprimer le Compte",
    version: "Version",
    editProfileTitle: "Modifier le Profil",
    fullName: "Nom Complet",
    email: "E-mail",
    phone: "Téléphone",
    saveChanges: "Enregistrer",
    cancel: "Annuler",
    save: "Enregistrer",
    confirm: "Confirmer",
    back: "Retour",
  },

  ar: {
    home: "الرئيسية",
    experts: "الخبراء",
    reports: "التقارير",
    profile: "الملف الشخصي",
    welcomeBack: "مرحباً بعودتك.",
    strategicInsights: "رؤى استراتيجية",
    searchPlaceholder: "بحث في الأسواق والاتجاهات…",
    featuredReport: "تقرير مميز",
    viewAll: "عرض الكل",
    yourProgress: "تقدمك",
    readFullReport: "← اقرأ التقرير الكامل",
    eliteExperts: "خبراء نخبة",
    filters: "فلاتر",
    searchExperts: "بحث مستشارين…",
    bookConsultation: "حجز استشارة",
    viewProfile: "عرض الملف",
    availableNow: "متاح الآن",
    busy: "مشغول",
    showing: "عرض",
    of: "من",
    expertsSuffix: "خبراء",
    marketReports: "تقارير السوق",
    searchReports: "بحث تقارير…",
    premiumMember: "عضو مميز",
    editProfile: "تعديل الملف",
    myReports: "تقاريري",
    myConsultations: "استشاراتي",
    paymentMethods: "طرق الدفع",
    settings: "الإعدادات",
    helpSupport: "المساعدة والدعم",
    logOut: "تسجيل الخروج",
    settingsTitle: "الإعدادات",
    appearance: "المظهر",
    lightMode: "فاتح",
    darkMode: "داكن",
    systemMode: "النظام",
    language: "اللغة",
    english: "English",
    french: "Français",
    arabic: "العربية",
    notifications: "الإشعارات",
    pushNotifications: "إشعارات فورية",
    accountSettings: "الحساب",
    changePassword: "تغيير كلمة المرور",
    privacyPolicy: "سياسة الخصوصية",
    termsConditions: "الشروط والأحكام",
    aboutApp: "حول التطبيق",
    deleteAccount: "حذف الحساب",
    version: "الإصدار",
    editProfileTitle: "تعديل الملف الشخصي",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    save: "حفظ",
    confirm: "تأكيد",
    back: "رجوع",
  },
} as const;

export function useTranslation() {
  const language = useAppStore((s) => s.language);
  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] ?? translations.en[key] ?? key;
  };
  return { t, language };
}

export const LANGUAGE_OPTIONS: {
  code: Language;
  label: string;
  flag: string;
}[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇩🇿" },
];
