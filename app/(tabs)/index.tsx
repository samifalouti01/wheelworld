import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>home</Text>
    </SafeAreaView>
  );
};

export default Index;
