// App.tsx
import "react-native-gesture-handler";
import React from "react";
import { ActivityIndicator, View, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import { KycProvider } from "./src/context/KYCContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSansHebrew: require("./assets/fonts/OpenSansHebrewRegular.ttf"),
  });

  // While loading
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // === Apply the font globally ===
  // 1. Text
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.style = {
    ...(Text.defaultProps.style || {}),
    fontFamily: "OpenSansHebrew",
  };
  // 2. (optional) TextInput
  if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.style = {
    ...(TextInput.defaultProps.style || {}),
    fontFamily: "OpenSansHebrew",
  };
  // =================================

  return (
    <KycProvider>
      <AppNavigator />
    </KycProvider>
  );
}

