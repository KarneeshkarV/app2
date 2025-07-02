import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";
import { useKyc } from "../../context/KYCContext";

const BirthdayScreen = ({ navigation }) => {
  const { updateKycData } = useKyc();
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const isValid =
    dob.day.length > 0 && dob.month.length > 0 && dob.year.length > 0;

  const handleNext = () => {
    const day = +dob.day,
      month = +dob.month,
      year = +dob.year,
      currentYear = new Date().getFullYear();
    if (
      !day ||
      !month ||
      !year ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > currentYear
    ) {
      Alert.alert("Invalid Date", "Please enter a valid date of birth.");
      return;
    }
    updateKycData("dob", dob);
    navigation.navigate("PhoneNumber");
  };
  const handleSkip = () => navigation.navigate("PhoneNumber");

  return (
    <KycScreenLayout
      step={3}
      totalSteps={11}
      title="What's your birthday?"
      subtitle="Enter DOB as on your government issued ID."
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
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
              Next
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      <View style={styles.dobInputsContainer}>
        <TextInput
          style={[styles.input, styles.day]}
          placeholder="DD"
          placeholderTextColor={colors.gray}
          value={dob.day}
          onChangeText={(day) => setDob((p) => ({ ...p, day }))}
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.month]}
          placeholder="MM"
          placeholderTextColor={colors.gray}
          value={dob.month}
          onChangeText={(month) => setDob((p) => ({ ...p, month }))}
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.year]}
          placeholder="YYYY"
          placeholderTextColor={colors.gray}
          value={dob.year}
          onChangeText={(year) => setDob((p) => ({ ...p, year }))}
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderColor,
    textAlign: "center",
    height: 50,
  },
  day: { width: "28%" },
  month: { width: "28%" },
  year: { width: "38%" },
  dobInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

export default BirthdayScreen;
