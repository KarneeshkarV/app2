import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const BirthdayScreen = ({ navigation }) => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    const { day, month, year } = dob;
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear();

    if (
      !dayNum ||
      !monthNum ||
      !yearNum ||
      dayNum < 1 ||
      dayNum > 31 ||
      monthNum < 1 ||
      monthNum > 12 ||
      yearNum < 1900 ||
      yearNum > currentYear
    ) {
      Alert.alert("Invalid Date", "Please enter a valid date of birth.");
      return;
    }

    // Navigate to the next screen
    console.log("DOB:", dob);
    navigation.navigate("PhoneNumber");
  };

  const handleSkip = () => {
    console.log("Skip birthday");
    navigation.navigate("PhoneNumber");
  };

  const isFormValid = () => {
    return dob.day.length > 0 && dob.month.length > 0 && dob.year.length > 0;
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 3/11</Text>
          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <StackedCard>
            <View style={styles.contentContainer}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                style={styles.scrollContent}
              >
                <Text style={globalStyles.title}>
                  What&apos;s your birthday?
                </Text>
                <Text style={globalStyles.subtitle}>
                  Enter DOB as on your government issued ID.
                </Text>

                <View style={styles.dobContainer}>
                  <TextInput
                    style={[styles.dobInput, styles.dobInputDay]}
                    placeholder="14"
                    placeholderTextColor={colors.gray}
                    value={dob.day}
                    onChangeText={(text) => setDob({ ...dob, day: text })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <TextInput
                    style={[styles.dobInput, styles.dobInputMonth]}
                    placeholder="01"
                    placeholderTextColor={colors.gray}
                    value={dob.month}
                    onChangeText={(text) => setDob({ ...dob, month: text })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <TextInput
                    style={[styles.dobInput, styles.dobInputYear]}
                    placeholder="1993"
                    placeholderTextColor={colors.gray}
                    value={dob.year}
                    onChangeText={(text) => setDob({ ...dob, year: text })}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>
              </ScrollView>

              <View style={styles.bottomContent}>
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
  },
  scrollContent: {},
  dobContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dobInput: {
    backgroundColor: colors.background,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderColor,
    textAlign: "center",
    height: 50,
  },
  dobInputDay: {
    width: "28%",
  },
  dobInputMonth: {
    width: "28%",
  },
  dobInputYear: {
    width: "38%",
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

export default BirthdayScreen;
