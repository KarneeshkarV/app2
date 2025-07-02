import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";
import { CustomCheckbox } from "../molecules/CustomCheckBox";

const accreditationOptions = [
  {
    id: "income",
    label: "My income was $300,000+ in last 12 months.",
  },
  {
    id: "financial",
    label: "My financial assets exceeds $1 million.",
  },
  {
    id: "personal",
    label: "My personal assets (incl. property) exceed $2 million.",
  },
];

const AccreditationLevelScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [acc, setAcc] = useState(false);
  const isValid = selectedOption !== null || acc;

  const handleNext = () => navigation.navigate("KYCSuccess");
  const handleSkip = handleNext;

  // pick an option → clear UAE checkbox
  const selectOption = (id: string) => {
    setSelectedOption(id);
    setAcc(false);
  };

  // toggle UAE checkbox → clear any option
  const handleAccChange = (val: boolean) => {
    setAcc(val);
    if (val) setSelectedOption(null);
  };

  return (
    <KycScreenLayout
      step={11}
      totalSteps={11}
      title="What's your accreditation level?"
      subtitle="Select one that applies."
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <CustomCheckbox
            label="I am an accredited investor under the MAUAE."
            value={acc}
            onValueChange={handleAccChange}
          />
          <TouchableOpacity
            style={{
              backgroundColor: isValid ? colors.primary : colors.lightGray,
              borderRadius: 60,
              paddingVertical: 16,
              alignItems: "center",
              marginTop: 24,
            }}
            onPress={handleNext}
            disabled={!isValid}
          >
            <Text
              style={{
                color: isValid ? colors.white : colors.gray,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              FINISH KYC
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      {accreditationOptions.map((option) => {
        const sel = selectedOption === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.item,
              sel && { borderColor: colors.primary },
            ]}
            onPress={() => selectOption(option.id)}
          >
            <Text style={[styles.label, sel && { color: colors.primary }]}>
              {option.label}
            </Text>
            <View
              style={[
                styles.radio,
                sel && { borderColor: colors.primary },
              ]}
            >
              {sel && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 100,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  // Rounded “radio” style indicators
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 12,         // half of width/height
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,          // half of width/height
  },
});

export default AccreditationLevelScreen;
