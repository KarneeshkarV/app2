import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const PrivacyLink = () => (
  <TouchableOpacity style={styles.container}>
    <Text style={styles.text}>
      <Text style={styles.link}>Learn more</Text> here about how we protect your
      privacy.
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
  link: {
    color: colors.primary,
    fontWeight: "500",
  },
});
