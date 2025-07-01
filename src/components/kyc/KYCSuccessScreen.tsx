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
<svg width="184" height="184" viewBox="0 0 184 184" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1235_65495)">
<path d="M92.1867 146.031C94.27 147.82 96.7584 149.074 99.436 149.683C102.114 150.293 104.899 150.24 107.552 149.529C110.204 148.819 112.644 147.471 114.657 145.604C116.671 143.738 118.199 141.408 119.109 138.817C121.808 139.324 124.59 139.166 127.214 138.355C129.837 137.544 132.224 136.105 134.165 134.163C136.107 132.221 137.546 129.835 138.356 127.211C139.167 124.587 139.325 121.805 138.817 119.106C141.409 118.197 143.739 116.669 145.607 114.655C147.474 112.641 148.821 110.202 149.532 107.549C150.243 104.896 150.295 102.11 149.685 99.4324C149.074 96.7546 147.819 94.2664 146.029 92.1837C147.818 90.1003 149.072 87.6119 149.681 84.9344C150.291 82.2568 150.238 79.4709 149.527 76.8184C148.817 74.1659 147.469 71.7268 145.602 69.7129C143.736 67.6989 141.406 66.1709 138.815 65.2613C139.322 62.5626 139.163 59.7809 138.352 57.1575C137.541 54.5341 136.102 52.1482 134.16 50.2068C132.218 48.2653 129.832 46.827 127.208 46.0165C124.584 45.206 121.803 45.0479 119.104 45.5558C118.194 42.9647 116.666 40.6347 114.652 38.7679C112.638 36.9011 110.199 35.5538 107.547 34.843C104.894 34.1322 102.109 34.0793 99.431 34.689C96.7534 35.2986 94.265 36.5523 92.1817 38.3414C90.0984 36.5518 87.6098 35.2977 84.9319 34.6879C82.2541 34.0781 79.4679 34.131 76.8151 34.8421C74.1624 35.5532 71.7232 36.901 69.7095 38.7685C67.6957 40.6359 66.1681 42.9666 65.2592 45.5583C62.5606 45.05 59.7787 45.2079 57.1549 46.0185C54.5312 46.8291 52.1449 48.2678 50.2032 50.2097C48.2616 52.1516 46.8232 54.5381 46.013 57.1619C45.2027 59.7858 45.0451 62.5677 45.5538 65.2663C42.9627 66.1759 40.6327 67.7039 38.7659 69.7179C36.8991 71.7319 35.5518 74.1709 34.841 76.8234C34.1302 79.4759 34.0773 82.2618 34.687 84.9394C35.2966 87.6169 36.5503 90.1053 38.3393 92.1887C36.5497 94.272 35.2956 96.7606 34.6858 99.4384C34.076 102.116 34.129 104.902 34.8401 107.555C35.5512 110.208 36.899 112.647 38.7664 114.661C40.6339 116.675 42.9646 118.202 45.5563 119.111C45.0481 121.81 45.2062 124.592 46.0168 127.216C46.8273 129.839 48.266 132.226 50.2078 134.168C52.1496 136.109 54.536 137.548 57.1598 138.359C59.7836 139.169 62.5655 139.327 65.2642 138.819C66.1736 141.41 67.7017 143.741 69.7157 145.607C71.7297 147.474 74.1689 148.822 76.8216 149.532C79.4743 150.243 82.2603 150.295 84.9379 149.685C87.6155 149.075 90.1037 147.821 92.1867 146.031Z" fill="white" fill-opacity="0.58" shape-rendering="crispEdges"/>
</g>
<defs>
<filter id="filter0_d_1235_65495" x="20.2646" y="20.2666" width="143.842" height="143.84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1235_65495"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1235_65495" result="shape"/>
</filter>
</defs>
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
              Thanks for submitting your document we&apos;ll verify it and
              complete your KYC as soon as possible
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
                <Ionicons name="cash-outline" size={24} color={colors.white} />
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
