import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const statuses = [
  { id: "employed", label: "Employed", icon: "briefcase-outline" },
  { id: "self-employed", label: "Self-Employed", icon: "person-outline" },
  { id: "student", label: "Student", icon: "school-outline" },
  { id: "homemaker", label: "Homemaker", icon: "home-outline" },
  { id: "seeker", label: "Employment Seeker", icon: "search-outline" },
  { id: "retired", label: "Retired", icon: "leaf-outline" },
];

const EmploymentStatusScreen = ({ navigation }) => {
  const [sel, setSel] = useState<string>("employed");
  const isValid = sel != null;
  const handleNext = () => navigation.navigate("PoliticallyExposedPerson");
  const handleSkip = handleNext;

  return (
    <KycScreenLayout
      step={8}
      totalSteps={11}
      title="What is your Employment Status?"
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
              Next
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      {statuses.map((s) => {
        const selected = sel === s.id;
        return (
          <TouchableOpacity
            key={s.id}
            style={[
              styles.item,
              selected && {
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setSel(s.id)}
          >
            <Ionicons
              name={s.icon}
              size={20}
              color={selected ? colors.primary : colors.white}
              style={[
                styles.icon,
                selected && { backgroundColor: colors.white },
              ]}
            />
            <Text
              style={[
                styles.label,
                selected && { color: colors.primary, fontWeight: "600" },
              ]}
            >
              {s.label}
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
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    // just shows the checkmark
  },
});

export default EmploymentStatusScreen;
