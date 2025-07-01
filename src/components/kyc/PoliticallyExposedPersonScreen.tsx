import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const options = [
  { id: "no", label: "No, I'm not a PEP." },
  { id: "yes", label: "Yes, I or a family member are PEP." },
];

const PoliticallyExposedPersonScreen = ({ navigation }) => {
  const [pep, setPep] = useState<string | null>(null);
  const isValid = pep != null;
  const handleNext = () => navigation.navigate("IdentityVerification");
  const handleSkip = handleNext;

  return (
    <KycScreenLayout
      step={9}
      totalSteps={11}
      title="Are you a politically exposed person?"
      subtitle="Held a public role in Singapore or overseas?"
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
            <Text style={{
              color: isValid ? colors.white : colors.gray,
              fontSize: 16, fontWeight: "600"
            }}>
              Confirm
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      {options.map((o) => {
        const sel = pep === o.id;
        return (
          <TouchableOpacity
            key={o.id}
            style={[
              styles.item,
              sel && { borderColor: colors.primary },
            ]}
            onPress={() => setPep(o.id)}
          >
            <Text
              style={[
                styles.label,
                sel && { color: colors.primary },
              ]}
            >
              {o.label}
            </Text>
            <View style={[styles.radio, sel && { borderColor: colors.primary }]}>
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
    borderRadius: 12,
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
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});

export default PoliticallyExposedPersonScreen;
