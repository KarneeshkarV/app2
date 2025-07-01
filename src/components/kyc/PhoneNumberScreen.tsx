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
import { CustomCheckbox } from "../molecules/CustemCheckBox";

const PhoneNumberScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [isSameAsLogin, setIsSameAsLogin] = useState(false);
  const [isWhatsappAvailable, setIsWhatsappAvailable] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("+971");
  const [items, setItems] = useState([
    { label: "🇦🇪 +971", value: "+971" },
    { label: "🇺🇸 +1", value: "+1" },
    { label: "🇬🇧 +44", value: "+44" },
    { label: "🇮🇳 +91", value: "+91" },
  ]);

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    console.log(
      "Phone:",
      value + phone,
      "isSameAsLogin:",
      isSameAsLogin,
      "isWhatsappAvailable:",
      isWhatsappAvailable,
    );
    navigation.navigate("PlaceOfBirth");
  };

  const handleSkip = () => {
    console.log("Skip phone number");
    navigation.navigate("PlaceOfBirth");
  };

  const isFormValid = () => {
    return phone.trim().length > 5;
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
          <Text style={styles.stepText}>Step 4/11</Text>
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
              <Text style={globalStyles.title}>
                What&apos;s your phone number?
              </Text>
              <Text style={globalStyles.subtitle}>
                Enter your registered phone number.
              </Text>

              <View style={styles.phoneInputContainer}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  labelStyle={styles.dropdownLabel}
                  listItemLabelStyle={styles.dropdownListItem}
                  dropDownContainerStyle={styles.dropdownList}
                  arrowIconStyle={styles.arrowIcon}
                  tickIconStyle={{ tintColor: colors.primary }}
                  listMode="MODAL"
                />
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  placeholderTextColor={colors.gray}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <CustomCheckbox
                label="Same as logged in phone number."
                value={isSameAsLogin}
                onValueChange={setIsSameAsLogin}
              />
              <CustomCheckbox
                label="Available on WhatsApp at this number for account-related issues."
                value={isWhatsappAvailable}
                onValueChange={setIsWhatsappAvailable}
              />
            </ScrollView>

            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: isFormValid() ? colors.primary : "#A7D7B9",
                  },
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
                disabled={!isFormValid()}
              >
                <Text style={globalStyles.buttonText}>
                  {isFormValid() ? "Next" : "Confirm"}
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
  },
  scrollContent: {
    flex: 1,
  },
  phoneInputContainer: {
    flexDirection: "row",
    marginVertical: 20,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: "hidden",
  },
  dropdownContainer: {
    width: 120,
  },
  dropdown: {
    backgroundColor: colors.background,
    borderWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
  },
  dropdownLabel: {
    fontSize: 16,
    color: colors.black,
  },
  dropdownListItem: {
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  arrowIcon: {
    tintColor: colors.gray,
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.background,
    borderLeftWidth: 1,
    borderColor: colors.borderColor,
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
    flex: 1,
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

export default PhoneNumberScreen;
