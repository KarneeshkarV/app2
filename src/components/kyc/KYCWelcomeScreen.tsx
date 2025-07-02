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
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const { width, height } = Dimensions.get("window");
// match StackedCard's SHEET_RADIUS
const BLUR_CARD_RADIUS = 28;

const ShieldCheckIcon = ({ width = 180, height = 180 }) => {
  const svgMarkup = `
<svg width="250" height="251" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_1235_65595" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="250" height="251">
<rect y="0.5" width="250" height="250" fill="#C4C4C4"/>
</mask>
<g mask="url(#mask0_1235_65595)">
<path d="M164.628 89.7876C165.679 90.0169 166.616 90.5906 167.286 91.4106C167.956 92.2305 168.32 93.2483 168.32 94.2954V147.918C168.32 153.096 167.018 158.194 164.528 162.76C162.039 167.326 158.439 171.221 154.047 174.095L119.852 196.478L85.6562 174.095C81.2649 171.221 77.6651 167.327 75.1758 162.762C72.6867 158.197 71.3841 153.101 71.3828 147.924V94.2954L71.3867 94.0991C71.4294 93.1216 71.789 92.1792 72.417 91.4106C73.0871 90.5906 74.0245 90.0169 75.0752 89.7876L119.852 80.0171L164.628 89.7876Z" fill="#119B6F" stroke="url(#paint0_linear_1235_65595)" stroke-width="1.5"/>
<path d="M62.5 117.952V85.375L118.769 66.125L175.038 85.375V116.471L118.769 100.183L62.5 117.952Z" fill="url(#paint1_linear_1235_65595)" stroke="url(#paint2_linear_1235_65595)" stroke-width="1.5"/>
<foreignObject x="57.25" y="60.8325" width="124.538" height="62.6426"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2.25px);clip-path:url(#bgblur_0_1235_65595_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter0_i_1235_65595)" data-figma-bg-blur-radius="4.5">
<path d="M62.5 117.952V85.375L118.769 66.125L175.038 85.375V116.471L118.769 100.183L62.5 117.952Z" fill="url(#paint3_linear_1235_65595)"/>
<path d="M62.5 117.952V85.375L118.769 66.125L175.038 85.375V116.471L118.769 100.183L62.5 117.952Z" stroke="url(#paint4_linear_1235_65595)" stroke-width="1.5"/>
</g>
<path d="M184.655 149.796V170.366C184.655 171.575 184.163 172.738 183.28 173.599C182.452 174.406 181.344 174.885 180.173 174.941L179.938 174.947L162.332 174.951L145.941 174.947H119.796C118.539 174.947 117.336 174.46 116.453 173.599C115.57 172.738 115.078 171.575 115.078 170.366V149.796H184.655ZM119.796 123.145H179.938C181.195 123.145 182.397 123.632 183.28 124.493C184.163 125.354 184.655 126.516 184.655 127.725V137.635H115.078V127.725C115.078 126.516 115.571 125.354 116.453 124.493C117.336 123.632 118.539 123.145 119.796 123.145Z" fill="#64D292" stroke="url(#paint5_linear_1235_65595)" stroke-width="1.5"/>
</g>
<defs>
<filter id="filter0_i_1235_65595" x="57.25" y="60.8325" width="124.538" height="62.6426" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6" dy="1.5"/>
<feGaussianBlur stdDeviation="4.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.211765 0 0 0 0 0.352941 0 0 0 0 1 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1235_65595"/>
</filter>
<clipPath id="bgblur_0_1235_65595_clip_path" transform="translate(-57.25 -60.8325)"><path d="M62.5 117.952V85.375L118.769 66.125L175.038 85.375V116.471L118.769 100.183L62.5 117.952Z"/>
</clipPath><linearGradient id="paint0_linear_1235_65595" x1="175.02" y1="191.534" x2="48.1497" y2="111.763" gradientUnits="userSpaceOnUse">
<stop stop-color="#E4E5FF" stop-opacity="0.44"/>
<stop offset="1" stop-color="white" stop-opacity="0.04"/>
</linearGradient>
<linearGradient id="paint1_linear_1235_65595" x1="174.772" y1="97.7805" x2="118.894" y2="81.447" gradientUnits="userSpaceOnUse">
<stop stop-color="#64D292"/>
<stop offset="1" stop-color="#01771B" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_1235_65595" x1="181.84" y1="115.389" x2="126.908" y2="25.3892" gradientUnits="userSpaceOnUse">
<stop stop-color="#E4E5FF" stop-opacity="0.44"/>
<stop offset="1" stop-color="white" stop-opacity="0.04"/>
</linearGradient>
<linearGradient id="paint3_linear_1235_65595" x1="183.743" y1="79.8096" x2="134.101" y2="166.179" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7FFF2" stop-opacity="0.53"/>
<stop stop-color="#F2FFF4" stop-opacity="0.53"/>
<stop offset="1" stop-color="#CAFFC8"/>
</linearGradient>
<linearGradient id="paint4_linear_1235_65595" x1="181.84" y1="115.389" x2="126.908" y2="25.3892" gradientUnits="userSpaceOnUse">
<stop stop-color="#E4E5FF" stop-opacity="0.44"/>
<stop offset="1" stop-color="white" stop-opacity="0.04"/>
</linearGradient>
<linearGradient id="paint5_linear_1235_65595" x1="189.701" y1="173.066" x2="126.173" y2="109.156" gradientUnits="userSpaceOnUse">
<stop stop-color="#E4E5FF" stop-opacity="0.44"/>
<stop offset="1" stop-color="white" stop-opacity="0.04"/>
</linearGradient>
</defs>
</svg>
`;
  return <SvgXml xml={svgMarkup} width={width} height={height} />;
};

const KYCWelcomeScreen = ({ navigation }) => {
  const documents = [
    { id: 1, title: "Emirates ID card", icon: "card-outline" },
    {
      id: 2,
      title: "Keep your Passport/Government ID Card",
      icon: "document-text-outline",
    },
  ];

  const handleStartKYC = () => navigation.navigate("CountrySelection");
  const handleSkip = () => console.log("Skip KYC");

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <BlurView intensity={20} tint="light" style={styles.logoWrapper}>
            <ShieldCheckIcon />
          </BlurView>
        </View>
        <BlurView
          pointerEvents="none"
          intensity={40}
          tint="light"
          style={styles.behindCard}
        />

        {/* Main StackedCard */}
        <StackedCard topOffset={370}>
          <View style={styles.contentContainer}>
            {/* Skip button in card */}
            <View style={styles.cardHeader}>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>

            {/* Documents list */}
            <View style={styles.topContent}>
              <Text style={globalStyles.title}>Let's Verify KYC</Text>
              <Text style={globalStyles.subtitle}>
                Keep the following documents ready
              </Text>
              <View style={styles.documentsContainer}>
                {documents.map((doc) => (
                  <View key={doc.id} style={globalStyles.documentItem}>
                    <View style={globalStyles.documentIcon}>
                      <Ionicons
                        name={doc.icon}
                        size={30}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={globalStyles.documentText}>{doc.title}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Start button */}
            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={globalStyles.button}
                onPress={handleStartKYC}
                activeOpacity={0.8}
              >
                <Text style={globalStyles.buttonText}>Let's Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </StackedCard>
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  logoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 110, // Half of width/height to make it perfectly round
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Ensures the blur effect stays within the circular bounds
  },
  behindCard: {
    position: "absolute",
    top: 355, // a bit above the main card's topOffset (370)
    left: 12, // inset so it's slightly narrower
    right: 12,
    bottom: 0, // stretch down to bottom
    borderRadius: BLUR_CARD_RADIUS,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardHeader: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  skipText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  topContent: {
    flex: 1,
  },
  documentsContainer: {
    marginTop: 20,
  },
  bottomContent: {
    paddingBottom: 20,
  },
});

export default KYCWelcomeScreen;
