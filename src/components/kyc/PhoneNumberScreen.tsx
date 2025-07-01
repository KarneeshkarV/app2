import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { CustomCheckbox } from "../molecules/CustomCheckBox";
import { colors } from "../../styles/globalStyles";

const PhoneNumberScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [same, setSame] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [items, setItems] = useState([
    { label: "🇦🇪 +971", value: "+971" },
    { label: "🇺🇸 +1", value: "+1" },
    { label: "🇬🇧 +44", value: "+44" },
    { label: "🇮🇳 +91", value: "+91" },
  ]);
  const isValid = phone.trim().length > 5;

  const handleNext = () => navigation.navigate("PlaceOfBirth");
  const handleSkip = handleNext;

  return (
    <KycScreenLayout
      step={4}
      totalSteps={11}
      title="What's your phone number?"
      subtitle="Enter your registered phone number."
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
              style={{ color: colors.white, fontSize: 16, fontWeight: "600" }}
            >
              Next
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      <View style={styles.phoneContainer}>
        <DropDownPicker
          open={open}
          value={countryCode}
          items={items}
          setOpen={setOpen}
          setValue={setCountryCode}
          setItems={setItems}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          labelStyle={styles.dropdownLabel}
          dropDownContainerStyle={styles.dropdownList}
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
        value={same}
        onValueChange={setSame}
      />
      <CustomCheckbox
        label="Available on WhatsApp at this number for account-related issues."
        value={whatsapp}
        onValueChange={setWhatsapp}
      />
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    flexDirection: "row",
    marginVertical: 20,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: "hidden",
  },
  dropdownContainer: { width: 120 },
  dropdown: {
    backgroundColor: colors.background,
    borderWidth: 0,
    borderRightWidth: 1,
    borderRightColor: colors.borderColor,
  },
  dropdownLabel: { fontSize: 16, color: colors.black },
  dropdownList: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.background,
  },
});

export default PhoneNumberScreen;
