import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

const SelectableListItem = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={styles.selectableItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.selectableLabel}>{label}</Text>
    <View style={[styles.radio, isSelected && styles.radioSelected]}>
      {isSelected && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  selectableItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  selectableLabel: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    marginRight: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});

export default SelectableListItem;
