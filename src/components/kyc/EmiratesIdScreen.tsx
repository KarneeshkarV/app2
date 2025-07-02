import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { CustomCheckbox } from "../molecules/CustomCheckBox";
import { colors } from "../../styles/globalStyles";

const EmiratesIdScreen = ({ navigation }: any) => {
  const [id, setId] = useState("784-1234-1234567");
  const [agreed, setAgreed] = useState(true);
  const isValid = /^\d{3}-\d{4}-\d{7}$/.test(id) && agreed;

  const handleNext = () => {
    if (!agreed) {
      Alert.alert("Agreement Required", "You must agree to proceed.");
      return;
    }
    if (!/^\d{3}-\d{4}-\d{7}$/.test(id)) {
      Alert.alert(
        "Invalid ID",
        "Please enter a valid Emirates ID in XXX-XXXX-XXXXXXX format.",
      );
      return;
    }
    navigation.navigate("SourceOfFunds");
  };

  const handleSkip = () => navigation.navigate("SourceOfFunds");

  return (
    <KycScreenLayout
      step={6}
      totalSteps={11}
      title="What's your Emirates ID?"
      subtitle="Reconfirm your Emirates ID number."
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <CustomCheckbox
            label="I agree to share this information, as it is required to collect this as a financial institution regulated by monetary Authority of UAE."
            value={agreed}
            onValueChange={setAgreed}
          />
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isValid ? colors.primary : colors.lightGray },
            ]}
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
        placeholder="784-XXXX-XXXXXXX-X"
        placeholderTextColor={colors.gray}
        value={id}
        onChangeText={setId}
        keyboardType="number-pad"
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
    marginBottom: 20,
    height: 50,
    textAlign: "center",
  },
  button: {
    borderRadius: 60,
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default EmiratesIdScreen;
