import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { Colors, Fonts } from "@/constants/theme";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const themeColors = Colors[colorScheme];

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.button,
        { backgroundColor: themeColors.tint },
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: Fonts?.rounded ?? Fonts?.sans,
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.6,
  },
});
