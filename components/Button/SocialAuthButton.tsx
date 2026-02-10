import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Provider = "google" | "facebook";
type Mode = "signin" | "continue";

type SocialAuthButtonProps = {
  provider: Provider;
  mode?: Mode;
  onPress: () => void;
};

export default function SocialAuthButton({
  provider,
  mode = "signin",
  onPress,
}: SocialAuthButtonProps) {
  const isGoogle = provider === "google";

  const labelPrefix = mode === "continue" ? "Continue with" : "Sign in with";
  const providerLabel = isGoogle ? "Google" : "Facebook";

  const iconSource = isGoogle
    ? require("@/assets/auth/google.png")
    : require("@/assets/auth/facebook.png");

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      </View>

      <Text style={styles.text}>
        {labelPrefix} {providerLabel}
      </Text>

      <View style={styles.rightSpacer} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 54,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 28,
    height: 28,
  },

  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.sans,
    fontWeight: "500",
  },

  rightSpacer: {
    width: 36,
  },
});
