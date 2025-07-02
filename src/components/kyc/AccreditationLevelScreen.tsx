import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";
import { CustomCheckbox } from "../molecules/CustomCheckBox";
import { useKyc } from "../../context/KYCContext";
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [acc, setAcc] = useState(false);

  // valid if exactly one accreditation is selected
  const isValid = selectedOption !== null || acc;

  const { data } = useKyc();
  const handleNext = () => {
    console.log("KYC data:", JSON.stringify(data));
    navigation.navigate("KYCSuccess");
  };

  // when a radio option is picked, clear the checkbox
  const selectOption = (optionId) => {
    setSelectedOption(optionId);
    setAcc(false);
  };

  // when the checkbox toggles on, clear any radio choice
  const handleAccChange = (value) => {
    setAcc(value);
    if (value) setSelectedOption(null);
  };

  return (
    <KycScreenLayout
      step={11}
      totalSteps={11}
      title="What's your accreditation level?"
      subtitle="Select one that applies."
      onBack={() => navigation.goBack()}
      onSkip={handleNext}
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
        const selected = selectedOption === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.item,
              selected && {
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => selectOption(option.id)}
          >
            <Text
              style={[
                styles.label,
                selected && {
                  color: colors.primary,
                  fontWeight: "600",
                  marginLeft: 20,
                },
              ]}
            >
              {option.label}
            </Text>
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary}
                />
              )}
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
    marginLeft: 20,
    fontSize: 16,
    color: colors.black,
  },
  radio: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    // only shows the checkmark
  },
});

export default AccreditationLevelScreen;
