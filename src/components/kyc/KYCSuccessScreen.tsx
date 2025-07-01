import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { colors } from "../../styles/globalStyles";

const { width } = Dimensions.get("window");

const CelebrationIcon = ({ size = 120 }) => {
  const svg = `
    <svg width="${size}" height="${size}" ...>…</svg>
  `;
  return <SvgXml xml={svg} width={size} height={size} />;
};

const KYCSuccessScreen = ({ navigation }) => {
  return (
    <KycScreenLayout
      title="Hurray!!!"
      subtitle="KYC Completed"
      onBack={() => navigation.popToTop()}
      bottom={
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Ionicons name="mic-outline" size={24} color={colors.white} />
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      }
    >
      <View style={styles.center}>
        <CelebrationIcon size={150} />
        <Text style={styles.thanks}>
          Thanks for submitting your document. We’ll verify it ASAP.
        </Text>
      </View>
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  center: { alignItems: "center", marginVertical: 40 },
  thanks: {
    marginTop: 20,
    color: colors.white,
    textAlign: "center",
    lineHeight: 24,
    width: width * 0.8,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
  },
});

export default KYCSuccessScreen;
