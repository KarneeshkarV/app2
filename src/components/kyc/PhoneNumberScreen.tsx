import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { CustomCheckbox } from "../molecules/CustomCheckBox";
import { colors } from "../../styles/globalStyles";
import { useKyc } from "../../context/KYCContext";

const PhoneNumberScreen = ({ navigation }) => {
  const { updateKycData } = useKyc();
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
  const handleNext = () => {
    updateKycData("phone", `${countryCode}${phone}`);
    navigation.navigate("PlaceOfBirth");
  };
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
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            listMode="SCROLLVIEW"
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
            dropDownDirection="BOTTOM"
            // remove maxHeight prop here—handled in dropDownContainerStyle
          />
        </View>

        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          placeholderTextColor={colors.gray}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    // allow children to overflow
    overflow: "visible",
    zIndex: 1,
  },
  dropdownWrapper: {
    width: 120,
    // allow the dropdown to render outside the wrapper
    overflow: "visible",
    zIndex: 2000,
    ...Platform.select({
      android: { elevation: 5 },
    }),
  },
  dropdownContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 100,
    overflow: "visible",
  },
  dropdown: {
    backgroundColor: colors.background,
    borderWidth: 0,
  },
  dropdownLabel: {
    fontSize: 16,
    color: colors.black,
  },
  dropdownList: {
    // float absolutely below the pill
    position: "absolute",
    top: 54, // 50 (pill height) + 4 spacing
    left: 0,
    width: 120,
    maxHeight: 200,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    zIndex: 3,
    ...Platform.select({
      android: { elevation: 6 },
    }),
  },
  phoneInput: {
    flex: 1,
    height: 50,
    marginLeft: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 100,
    zIndex: 1,
  },
});

export default PhoneNumberScreen;

