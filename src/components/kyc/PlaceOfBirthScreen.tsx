import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const CustomCheckbox = ({ label, value, onValueChange }) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={() => onValueChange(!value)}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, value && styles.checkboxChecked]}>
      {value && <Ionicons name="checkmark" size={16} color={colors.white} />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const PlaceOfBirthScreen = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [isSameAsLegal, setIsSameAsLegal] = useState(false);

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(null);
  const [items, setItems] = useState([
    { label: "United Arab Emirates", value: "uae" },
    { label: "United States", value: "usa" },
    { label: "United Kingdom", value: "uk" },
    { label: "India", value: "india" },
  ]);

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    console.log(
      "City:",
      city,
      "Country:",
      country,
      "Same as Legal:",
      isSameAsLegal,
    );
    // Navigate to the next screen in the KYC flow
    navigation.navigate("EmiratesId");
  };

  const handleSkip = () => {
    console.log("Skip place of birth");
    navigation.navigate("EmiratesId");
  };

  const isFormValid = () => {
    return city.trim().length > 0 && country !== null;
  };

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
          <Text style={styles.stepText}>Step 5/11</Text>
          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        <StackedCard>
          <View style={styles.contentContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              style={styles.scrollContent}
            >
              <Text style={globalStyles.title}>Where you were born?</Text>
              <Text style={globalStyles.subtitle}>
                Enter the place of birth that&apos;s on your passport
              </Text>

              <TextInput
                style={styles.input}
                placeholder="City/ District/ Town"
                placeholderTextColor={colors.gray}
                value={city}
                onChangeText={setCity}
              />

              <DropDownPicker
                open={open}
                value={country}
                items={items}
                setOpen={setOpen}
                setValue={setCountry}
                setItems={setItems}
                placeholder="Select your country"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                textStyle={{ fontSize: 16, color: colors.black }}
                placeholderStyle={{ color: colors.gray, fontSize: 16 }}
                listMode="MODAL"
                containerStyle={{ marginBottom: 20 }}
                zIndex={1000}
              />

              <CustomCheckbox
                label="Same as legal address."
                value={isSameAsLegal}
                onValueChange={setIsSameAsLegal}
              />
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
  scrollContent: {},
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 20,
    height: 50,
  },
  dropdown: {
    backgroundColor: colors.background,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
  },
  dropdownList: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.gray,
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

export default PlaceOfBirthScreen;
