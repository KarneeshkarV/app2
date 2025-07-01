import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
//import { BlurView } from "expo-blur";
import { colors } from "../../styles/globalStyles";

/**
 * A three-layer "bottom-sheet" that mimics stacked cards with subtle blur effect.
 * Simply wrap your screen's previous <card> contents with <StackedCard>.
 */
const StackedCard: React.FC<{
  style?: StyleProp<ViewStyle>;
  topOffset?: number;
}> = ({ children, style, topOffset = 200 }) => {
  return (
    <View
      style={[styles.container, { top: topOffset }]}
      pointerEvents="box-none"
    >
      {/*   Far-back layer with subtle blur   */}
      <View style={styles.layerTwo} />

      {/*   Mid layer with subtle blur        */}
      <View style={styles.layerOne} />

      {/*   Front/content with clean white background    */}
      <View style={[styles.topLayer, style]}>{children}</View>
    </View>
  );
};

export default StackedCard;

const SHEET_RADIUS = 28;

const sheetShadow = {
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 6,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // Force everything to the centre so we get the nice rounded top corners
    alignItems: "center",
    display: "flex", // Use flexbox for layout
  },
  layerTwo: {
    position: "absolute",
    bottom: 16,
    width: "92%",
    height: "85%",
    borderRadius: SHEET_RADIUS,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    ...sheetShadow,
    opacity: 0.6,
  },
  layerOne: {
    position: "absolute",
    bottom: 8,
    width: "96%",
    height: "92%",
    borderRadius: SHEET_RADIUS,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    ...sheetShadow,
    opacity: 0.8,
  },
  topLayer: {
    width: "100%",
    height: "100%",
    borderRadius: SHEET_RADIUS,
    backgroundColor: "#FFFFFF",
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
  },
});
