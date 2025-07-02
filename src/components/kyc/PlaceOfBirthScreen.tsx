import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { CustomCheckbox } from "../molecules/CustomCheckBox";
import { colors } from "../../styles/globalStyles";
const PlaceOfBirthScreen = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [same, setSame] = useState(false);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "United Arab Emirates", value: "uae" },
    { label: "United States", value: "usa" },
    { label: "United Kingdom", value: "uk" },
    { label: "India", value: "india" },
  ]);

  const isValid = city.trim().length > 0 && country != null;
  const handleNext = () => navigation.navigate("EmiratesId");
  const handleSkip = handleNext;

  return (
    <KycScreenLayout
      step={5}
      totalSteps={11}
      title="Where you were born?"
      subtitle="Enter the place of birth that's on your passport"
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <CustomCheckbox
            label="Same as legal address."
            value={same}
            onValueChange={setSame}
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
              style={{
                color: colors.white,
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
      <TextInput
        style={styles.input}
        placeholder="City/ District/ Town"
        placeholderTextColor={colors.gray}
        value={city}
        onChangeText={setCity}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{ nestedScrollEnabled: true }}
        open={open}
        value={country}
        items={items}
        setOpen={setOpen}
        setValue={setCountry}
        setItems={setItems}
        placeholder="Select your country"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownList}
      />
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    borderRadius: 100,
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
    borderRadius: 100,
    minHeight: 50,
    marginBottom: 20,
  },
  dropdownList: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 12,
  },
});

export default PlaceOfBirthScreen;
