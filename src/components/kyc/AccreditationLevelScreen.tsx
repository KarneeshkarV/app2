import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";
import { CustomCheckbox } from "../molecules/CustomCheckBox";
const AccreditationLevelScreen = ({ navigation }) => {
  const [inc, setInc] = useState(false);
  const [fin, setFin] = useState(false);
  const [pers, setPers] = useState(false);
  const [acc, setAcc] = useState(false);
  const isValid = inc || fin || pers || acc;

  const handleNext = () => {
    navigation.navigate("KYCSuccess");
  };
  const handleSkip = handleNext;

  const Item = ({ label, value, onChange }) => (
    <TouchableOpacity
      style={styles.chkContainer}
      onPress={() => onChange(!value)}
    >
      <View style={[styles.chk, value && styles.chkChecked]}>
        {value && <Ionicons name="checkmark" size={16} color={colors.white} />}
      </View>
      <Text style={styles.chkLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KycScreenLayout
      step={11}
      totalSteps={11}
      title="What's your accreditation level?"
      subtitle="Select all that apply."
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <TouchableOpacity
            style={{
              backgroundColor: isValid ? colors.primaryBtn : colors.lightGray,
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
      <Item
        label="My income was $300,000+ in last 12 months."
        value={inc}
        onChange={setInc}
      />
      <Item
        label="My financial assets exceeds $1 million."
        value={fin}
        onChange={setFin}
      />
      <Item
        label="My personal assets (incl. property) exceed $2 million."
        value={pers}
        onChange={setPers}
      />
      <View style={styles.accContainer}>
        <CustomCheckbox
          label="I am an accredited investor under the MAUAE."
          value={acc}
          onValueChange={setAcc}
        />
      </View>
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  accContainer: {},
  chkContainer: {
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
  chk: {
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
  chkChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chkLabel: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    lineHeight: 22,
  },
});

export default AccreditationLevelScreen;
