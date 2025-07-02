import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";
import { useKyc } from "../../context/KYCContext";

const LegalAddressScreen = ({ navigation }) => {
  const { updateKycData } = useKyc();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [zipCode, setZipCode] = useState("");
  const isValid =
    street.trim() && city.trim() && stateField.trim() && zipCode.trim();

  const handleNext = () => {
    if (!isValid) {
      Alert.alert(
        "Please fill all required fields",
        "All address fields are required to continue.",
      );
      return;
    }
    updateKycData("address", { street, city, state: stateField, zipCode });
    navigation.navigate("Birthday");
  };
  const handleSkip = () => navigation.navigate("Birthday");

  return (
    <KycScreenLayout
      step={2}
      totalSteps={11}
      title="What's your legal address?"
      subtitle="Type your address"
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
      <TextInput
        style={styles.input}
        placeholder="Address (Area and Street)"
        placeholderTextColor={colors.gray}
        value={street}
        onChangeText={setStreet}
        multiline
        numberOfLines={2}
      />
      <TextInput
        style={styles.input}
        placeholder="City/ District/ Town"
        placeholderTextColor={colors.gray}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor={colors.gray}
        value={stateField}
        onChangeText={setStateField}
      />
      <Text style={styles.label}>Zip Code</Text>
      <TextInput
        style={[styles.input, { marginTop: 8 }]}
        placeholder="Enter your zipcode"
        placeholderTextColor={colors.gray}
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
      />
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    borderRadius: 100,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default LegalAddressScreen;
