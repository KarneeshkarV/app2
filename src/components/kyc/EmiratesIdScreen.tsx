import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const CustomCheckbox = ({ label, value, onValueChange }) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={() => onValueChange(!value)}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, value && styles.checkboxChecked]}>
      {value && <Ionicons name="checkmark" size={16} color={colors.white} />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const EmiratesIdScreen = ({ navigation }) => {
  const [emiratesId, setEmiratesId] = useState("784-1234-1234567");
  const [agreed, setAgreed] = useState(true);

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    if (!agreed) {
      Alert.alert(
        "Agreement Required",
        "You must agree to share this information to proceed.",
      );
      return;
    }
    if (!/^\d{3}-\d{4}-\d{7}$/.test(emiratesId)) {
      Alert.alert(
        "Invalid ID",
        "Please enter a valid Emirates ID in the format XXX-XXXX-XXXXXXX.",
      );
      return;
    }
    console.log("Emirates ID:", emiratesId);
    navigation.navigate("SourceOfFunds");
  };

  const handleSkip = () => {
    console.log("Skip Emirates ID");
    navigation.navigate("SourceOfFunds");
  };

  const isFormValid = () => {
    return emiratesId.trim().length > 0 && agreed;
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground
        colors={[colors.primary, colors.primaryDark]}
        style={globalStyles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 6/11</Text>
          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        <StackedCard>
          <View style={styles.contentContainer}>
            <View>
              <Text style={globalStyles.title}>
                What&apos;s your Emirates ID?
              </Text>
              <Text style={globalStyles.subtitle}>
                Reconfirm your Emirates ID number.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="784-XXXX-XXXXXXX-X"
                placeholderTextColor={colors.gray}
                value={emiratesId}
                onChangeText={setEmiratesId}
                keyboardType="number-pad"
              />

              <CustomCheckbox
                label="I agree to share this information, as it is required to collect this as a financial institution regulated by monetary Authority of UAE."
                value={agreed}
                onValueChange={setAgreed}
              />
            </View>

            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: isFormValid()
                      ? colors.primaryBtn
                      : colors.lightGray,
                  },
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
                disabled={!isFormValid()}
              >
                <Text
                  style={[
                    globalStyles.buttonText,
                    { color: isFormValid() ? colors.white : colors.gray },
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.privacyContainer}>
                <Text style={styles.privacyText}>
                  <Text style={styles.privacyLink}>Learn more</Text> here about
                  how we protect your privacy.
                </Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  skipHeaderButton: {
    marginLeft: "auto",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipHeaderText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 20,
    height: 50,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.gray,
    flex: 1,
  },
  bottomContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  privacyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  privacyText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
  privacyLink: {
    color: colors.primary,
    fontWeight: "500",
  },
});

export default EmiratesIdScreen;
