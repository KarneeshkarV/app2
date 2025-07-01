import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const LegalAddressScreen = ({ navigation, route }) => {
  const { selectedCountry } = route.params || {};
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country:
      selectedCountry?.label?.replace(/^[^]+/, "").trim() ||
      "United Arab Emirates",
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    const requiredFields = ["street", "city", "state", "zipCode"];
    const missingFields = requiredFields.filter(
      (field) => !addressData[field].trim(),
    );

    if (missingFields.length > 0) {
      Alert.alert(
        "Please fill all required fields",
        "All address fields are required to continue.",
      );
      return;
    }

    console.log("Address data:", addressData);
    navigation.navigate("Birthday");
  };

  const handleSkip = () => {
    console.log("Skip legal address");
    navigation.navigate("Birthday");
  };

  const updateField = (field, value) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      addressData.street.trim() &&
      addressData.city.trim() &&
      addressData.state.trim() &&
      addressData.zipCode.trim()
    );
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.stepText}>Step 2/11</Text>

          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <StackedCard>
            <View style={styles.contentContainer}>
              <ScrollView
                style={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <Text style={globalStyles.title}>
                  What&apos;s your legal address?
                </Text>
                <Text style={globalStyles.subtitle}>Type your address</Text>

                {/* Address Input Fields */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Address (Area and Street)"
                    placeholderTextColor={colors.gray}
                    value={addressData.street}
                    onChangeText={(value) => updateField("street", value)}
                    multiline={true}
                    numberOfLines={2}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="City/ District/ Town"
                    placeholderTextColor={colors.gray}
                    value={addressData.city}
                    onChangeText={(value) => updateField("city", value)}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="State"
                    placeholderTextColor={colors.gray}
                    value={addressData.state}
                    onChangeText={(value) => updateField("state", value)}
                  />

                  <View style={styles.zipCodeContainer}>
                    <Text style={styles.zipCodeLabel}>Zip Code</Text>
                    <TextInput
                      style={[styles.input, { marginTop: 8 }]}
                      placeholder="Enter your zipcode"
                      placeholderTextColor={colors.gray}
                      value={addressData.zipCode}
                      onChangeText={(value) => updateField("zipCode", value)}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.countryContainer}>
                    <Text style={styles.countryLabel}>Country</Text>
                    <TextInput
                      style={[
                        styles.input,
                        { marginTop: 8, backgroundColor: "#F0F0F0" },
                      ]}
                      value={addressData.country}
                      editable={false}
                    />
                  </View>
                </View>
              </ScrollView>

              <View style={styles.bottomContent}>
                {/* Next Button */}
                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    {
                      backgroundColor: isFormValid()
                        ? colors.primary
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

                {/* Privacy Link */}
                <TouchableOpacity style={styles.privacyContainer}>
                  <Text style={styles.privacyText}>
                    <Text style={styles.privacyLink}>Learn more</Text> here
                    about how we protect your privacy.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </StackedCard>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = {
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
  },
  scrollContent: {
    flex: 1,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 16,
    minHeight: 50,
  },
  zipCodeContainer: {
    marginBottom: 16,
  },
  zipCodeLabel: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
  },
  countryContainer: {
    marginBottom: 16,
  },
  countryLabel: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
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
};

export default LegalAddressScreen;
