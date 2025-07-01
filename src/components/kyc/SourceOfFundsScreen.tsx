import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const sources = [
  { id: "income", label: "Income", icon: "briefcase-outline" },
  { id: "investments", label: "Investments", icon: "trending-up-outline" },
  { id: "inheritance", label: "Inheritance", icon: "people-outline" },
  { id: "others", label: "Others", icon: "ellipsis-horizontal-outline" },
];

const SourceOfFundsScreen = ({ navigation }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const isValid = selected.length > 0;
  const handleNext = () => navigation.navigate("EmploymentStatus");
  const handleSkip = handleNext;

  return (
    <KycScreenLayout
      step={7}
      totalSteps={11}
      title="What's your source of funds?"
      subtitle="Select that apply."
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
              Confirm
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      {sources.map((s) => {
        const sel = selected.includes(s.id);
        return (
          <TouchableOpacity
            key={s.id}
            style={[
              styles.item,
              sel && {
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => toggle(s.id)}
          >
            <Ionicons
              name={s.icon}
              size={20}
              color={sel ? colors.primary : colors.white}
              style={[styles.icon, sel && { backgroundColor: colors.white }]}
            />
            <Text
              style={[
                styles.label,
                sel && { color: colors.primary, fontWeight: "600" },
              ]}
            >
              {s.label}
            </Text>
            <View style={[styles.radio, sel && styles.radioSelected]}>
              {sel && (
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 12,
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
  radioSelected: {
    borderColor: colors.primary,
  },
});

export default SourceOfFundsScreen;
