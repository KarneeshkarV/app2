import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const CountrySelectionScreen = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "🇦🇪 United Arab Emirates", value: "uae" },
    { label: "🇺🇸 United States", value: "usa" },
    { label: "🇬🇧 United Kingdom", value: "uk" },
    // …
  ]);

  useEffect(() => {
    if (route.params?.selectedCountry) {
      setValue(route.params.selectedCountry.value);
    }
  }, [route.params?.selectedCountry]);

  const handleConfirm = () => {
    if (!value) {
      return Alert.alert(
        "Please select a country",
        "You must select your country of citizenship to continue.",
      );
    }
    navigation.navigate("AddressInput", {
      selectedCountry: items.find((i) => i.value === value),
    });
  };

  return (
    <KycScreenLayout
      step={1}
      totalSteps={11}
      title="What's your country?"
      subtitle="Select your country of citizenship"
      onBack={() => navigation.goBack()}
      onSkip={() =>
        navigation.navigate("AddressInput", {
          selectedCountry: {
            label: "🇦🇪 United Arab Emirates",
            value: "uae",
          },
        })
      }
      bottom={
        <>
          <TouchableOpacity
            style={{
              backgroundColor: value ? colors.primary : colors.lightGray,
              borderRadius: 60,
              paddingVertical: 16,
              alignItems: "center",
            }}
            onPress={handleConfirm}
            disabled={!value}
          >
            <Text
              style={{
                color: value ? colors.white : colors.gray,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{ nestedScrollEnabled: true }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select your country"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.borderColor,
          borderRadius: 12,
        }}
        dropDownContainerStyle={{
          backgroundColor: colors.white,
          borderColor: colors.borderColor,
        }}
      />
    </KycScreenLayout>
  );
};

export default CountrySelectionScreen;
