import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";
import { SelectableListItem } from "../molecules/SelecetableListItem";

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

const AccreditationLevelScreen = ({ navigation }) => {
  const [incomeLevel, setIncomeLevel] = useState(true); // Pre-selected as shown in image
  const [financialAssets, setFinancialAssets] = useState(false);
  const [personalAssets, setPersonalAssets] = useState(false);
  const [accreditedInvestor, setAccreditedInvestor] = useState(true); // Pre-selected as shown in image

  const handleBack = () => navigation.goBack();

  const handleFinish = () => {
    const selections = {
      incomeLevel,
      financialAssets,
      personalAssets,
      accreditedInvestor,
    };
    console.log("Accreditation selections:", selections);
    navigation.navigate("KYCSuccess");
  };

  const handleSkip = () => {
    navigation.navigate("KYCSuccess");
  };

  const isFormValid = () => {
    return (
      incomeLevel || financialAssets || personalAssets || accreditedInvestor
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 11/11</Text>
          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        <StackedCard>
          <View style={styles.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={globalStyles.title}>
                What&apos;s your accreditation level?
              </Text>
              <Text style={styles.subtitle}>Select all that apply.</Text>

              <SelectableListItem
                label="My income was $300,000 or above in the last 12 months."
                isSelected={incomeLevel}
                onPress={() => setIncomeLevel(!incomeLevel)}
              />

              <SelectableListItem
                label="My financial assets exceeds $1 million."
                isSelected={financialAssets}
                onPress={() => setFinancialAssets(!financialAssets)}
              />

              <SelectableListItem
                label="My personal assets (including property) exceed $2 million."
                isSelected={personalAssets}
                onPress={() => setPersonalAssets(!personalAssets)}
              />

              <CustomCheckbox
                label="I am an accredited investor under the MAUAE and agree to the Accredited Investor Declaration and Opt-in."
                value={accreditedInvestor}
                onValueChange={setAccreditedInvestor}
              />
            </ScrollView>

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
                onPress={handleFinish}
                activeOpacity={0.8}
                disabled={!isFormValid()}
              >
                <Text
                  style={[
                    globalStyles.buttonText,
                    { color: isFormValid() ? colors.white : colors.gray },
                  ]}
                >
                  FINISH KYC
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
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
  },
  skipHeaderButton: {
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
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginLeft: 10,
    marginBottom: 24,
  },
  // Added missing SelectableListItem styles
  selectableItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  selectableLabel: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    marginRight: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  // Checkbox styles
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
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
    fontSize: 16,
    color: colors.black,
    flex: 1,
    lineHeight: 22,
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

export default AccreditationLevelScreen;
