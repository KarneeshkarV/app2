import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const AddressInputScreen = ({ navigation, route }) => {
  const { selectedCountry } = route.params || {};
  const handleNext = () =>
    navigation.navigate("LegalAddress", { selectedCountry });
  const handleSkip = handleNext;

  return (
    <KycScreenLayout
      step={1}
      totalSteps={11}
      title="Select your country of citizenship"
      subtitle="Type your address"
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              borderRadius: 60,
              paddingVertical: 16,
              alignItems: "center",
            }}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: colors.white,
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
      {selectedCountry && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.borderColor,
            marginVertical: 20,
          }}
          onPress={() =>
            navigation.navigate("CountrySelection", { selectedCountry })
          }
        >
          <Text style={{ fontSize: 24, marginRight: 12 }}>
            {selectedCountry.label.split(" ")[0]}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.black,
              flex: 1,
              fontWeight: "500",
            }}
          >
            {selectedCountry.label.split(" ").slice(1).join(" ")}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.gray} />
        </TouchableOpacity>
      )}
    </KycScreenLayout>
  );
};

export default AddressInputScreen;
