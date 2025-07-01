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
    style={styles.selectableItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={globalStyles.documentIcon}>
      <Ionicons name={icon} size={20} color={colors.white} />
    </View>
    <Text style={styles.selectableLabel}>{label}</Text>
    <View style={[styles.radio, isSelected && styles.radioSelected]}>
      {isSelected && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);

const SourceOfFundsScreen = ({ navigation }) => {
  const [selectedSources, setSelectedSources] = useState([]);

  const sources = [
    { id: "income", label: "Income", icon: "briefcase-outline" },
    { id: "investments", label: "Investments", icon: "trending-up-outline" },
    { id: "inheritance", label: "Inheritance", icon: "people-outline" },
    { id: "others", label: "Others", icon: "ellipsis-horizontal-outline" },
  ];

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    console.log("Selected sources:", selectedSources);
    navigation.navigate("EmploymentStatus");
  };

  const handleSkip = () => {
    console.log("Skip Source of Funds");
    navigation.navigate("EmploymentStatus");
  };

  const toggleSource = (id) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isFormValid = () => selectedSources.length > 0;

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
          <Text style={styles.stepText}>Step 7/11</Text>
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
                What's your source of funds?
              </Text>
              <Text style={globalStyles.subtitle}>Select that apply.</Text>

              {sources.map((source) => (
                <SelectableListItem
                  key={source.id}
                  label={source.label}
                  icon={source.icon}
                  isSelected={selectedSources.includes(source.id)}
                  onPress={() => toggleSource(source.id)}
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
                  Confirm
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
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  selectableLabel: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    marginLeft: 12,
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
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
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

export default SourceOfFundsScreen;
