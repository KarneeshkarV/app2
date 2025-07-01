import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { globalStyles, colors } from "../../styles/globalStyles";
import GradientBackground from "../molecules/GradientBackground";

const { width } = Dimensions.get("window");

const CelebrationIcon = ({ size = 120 }) => {
  const svgMarkup = `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="rgba(255, 255, 255, 0.2)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2"/>
      <circle cx="60" cy="60" r="35" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
      <circle cx="60" cy="60" r="20" fill="rgba(255, 255, 255, 0.4)"/>
      <path d="M45 60L55 70L75 50" stroke="#2ECC71" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  return <SvgXml xml={svgMarkup} width={size} height={size} />;
};

const KYCSuccessScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to main app or dashboard
    console.log("KYC completed successfully!");
    // You can navigate to your main app screen here
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground>
        <View style={styles.container}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <CelebrationIcon size={150} />
          </View>

          {/* Success Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.successTitle}>Hurray!!!</Text>
            <Text style={styles.successSubtitle}>KYC Completed</Text>
            <Text style={styles.thankYouText}>
              Thanks for submitting your document we'll verify it and complete
              your KYC as soon as possible
            </Text>
          </View>

          {/* Get Started Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="microphone-outline"
                  size={24}
                  color={colors.white}
                />
                <Text style={styles.buttonText}>Get Started</Text>
                <Text style={styles.buttonArrow}>{">>>"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  successTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 20,
    textAlign: "center",
    opacity: 0.9,
  },
  thankYouText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.8,
    maxWidth: width * 0.8,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minWidth: 200,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  buttonArrow: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default KYCSuccessScreen;
