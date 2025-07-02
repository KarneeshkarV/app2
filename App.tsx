import "react-native-gesture-handler";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import { KycProvider } from "./src/context/KYCContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSansHebrew: require("./assets/fonts/OpenSansHebrewRegular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KycProvider>
      <AppNavigator />
    </KycProvider>
  );
}
