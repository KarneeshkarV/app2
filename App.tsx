import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { KycProvider } from "./src/context/KYCContext";

export default function App() {
  return (
    <KycProvider>
      <AppNavigator />
    </KycProvider>
  );
}
