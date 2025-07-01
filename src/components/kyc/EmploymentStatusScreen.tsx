import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const SelectableListItem = ({ label, icon, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.selectableItem, isSelected && styles.selectedItem]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[globalStyles.documentIcon, isSelected && styles.selectedIcon]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={isSelected ? colors.primary : colors.white}
      />
    </View>
    <Text style={[styles.selectableLabel, isSelected && styles.selectedLabel]}>
      {label}
    </Text>
    <View style={[styles.radio, isSelected && styles.radioSelected]}>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
      )}
    </View>
  </TouchableOpacity>
);

const EmploymentStatusScreen = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState("employed");

  const statuses = [
    { id: "employed", label: "Employed", icon: "briefcase-outline" },
    { id: "self-employed", label: "Self-Employed", icon: "person-outline" },
    { id: "student", label: "Student", icon: "school-outline" },
    { id: "homemaker", label: "Homemaker", icon: "home-outline" },
    { id: "seeker", label: "Employement Seeker", icon: "search-outline" },
    { id: "retired", label: "Retired", icon: "leaf-outline" },
  ];

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    console.log("Selected status:", selectedStatus);
    navigation.navigate("PoliticallyExposedPerson");
  };

  const handleSkip = () => {
    console.log("Skip Employment Status");
    navigation.navigate("PoliticallyExposedPerson");
  };

  const isFormValid = () => selectedStatus !== null;

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground
        colors={[colors.primary, colors.primaryDark]}
        style={globalStyles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 8/11</Text>
          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        <StackedCard>
          <View style={styles.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={globalStyles.title}>
                What is your Employment Status?
              </Text>
              <Text style={globalStyles.subtitle}>Select that apply.</Text>

              {statuses.map((status) => (
                <SelectableListItem
                  key={status.id}
                  label={status.label}
                  icon={status.icon}
                  isSelected={selectedStatus === status.id}
                  onPress={() => setSelectedStatus(status.id)}
                />
              ))}
            </ScrollView>

            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: isFormValid()
                      ? colors.primaryBtn
                      : colors.lightGray,
                  },
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
                disabled={!isFormValid()}
              >
                <Text
                  style={[
                    globalStyles.buttonText,
                    { color: isFormValid() ? colors.white : colors.gray },
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.privacyContainer}>
                <Text style={styles.privacyText}>
                  <Text style={styles.privacyLink}>Learn more</Text> here about
                  how we protect your privacy.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </StackedCard>
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  skipHeaderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipHeaderText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  selectableItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  selectedItem: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  selectedIcon: {
    backgroundColor: colors.white,
  },
  selectableLabel: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    marginLeft: 12,
  },
  selectedLabel: {
    fontWeight: "600",
    color: colors.primary,
  },
  radio: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  privacyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  privacyText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
  privacyLink: {
    color: colors.primary,
    fontWeight: "500",
  },
});

export default EmploymentStatusScreen;
