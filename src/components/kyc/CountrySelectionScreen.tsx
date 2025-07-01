import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const PhoneNumberScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [codeItems, setCodeItems] = useState([
    { label: "🇦🇪 +971", value: "+971" },
    { label: "🇺🇸 +1", value: "+1" },
    { label: "🇬🇧 +44", value: "+44" },
    // …
  ]);
  const [phone, setPhone] = useState("");

  const handleNext = () => {
    if (!phone.trim()) {
      return Alert.alert(
        "Please enter your phone number",
        "You must enter a valid phone number to continue.",
      );
    }
    // …navigate forward
  };

  return (
    <KycScreenLayout
      step={4}
      totalSteps={11}
      title="What's your phone number?"
      subtitle="Enter your registered phone number."
      onBack={() => navigation.goBack()}
      bottom={
        <>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: phone ? colors.primary : colors.lightGray },
            ]}
            disabled={!phone}
            onPress={handleNext}
          >
            <Text
              style={[
                styles.buttonText,
                { color: phone ? colors.white : colors.gray },
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      <View style={styles.inputRow}>
        {/* Country Code Picker */}
        <View style={styles.codeContainer}>
          <DropDownPicker
            open={open}
            value={countryCode}
            items={codeItems}
            setOpen={setOpen}
            setValue={setCountryCode}
            setItems={setCodeItems}
            style={styles.codePicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>

        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          keyboardType="phone-pad"
          placeholder="Phone Number"
          placeholderTextColor={colors.gray}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
    </KycScreenLayout>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  codeContainer: {
    width: 100,
    // ensure dropdown z‐index
    zIndex: 1000,
  },
  codePicker: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 1,
    // only round left corners
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: 56,
  },
  dropDownContainer: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 1,
    // remove left border so they join seamlessly
    borderLeftWidth: 0,
    // only round right corners
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 60,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

