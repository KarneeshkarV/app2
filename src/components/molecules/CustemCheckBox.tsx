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

export const CustomCheckbox = ({ label, value, onValueChange }) => (
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
