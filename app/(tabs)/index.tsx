import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>home</Text>
      <Button onPress={() => router.push("/onBoarding/onboarding-1")} >Go to on Boarding</Button>
    </SafeAreaView>
  );
};

export default Index;
