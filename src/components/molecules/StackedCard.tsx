import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "../../styles/globalStyles";

const StackedCard: React.FC<{
  style?: StyleProp<ViewStyle>;
  topOffset?: number;
  children?: ReactNode;
}> = ({ children, style, topOffset = 200 }) => {
  return (
    <View
      style={[styles.container, { top: topOffset }]}
      pointerEvents="box-none"
    >
      <BlurView intensity={100} tint="default" style={[styles.topLayer, style]}>
        <View style={styles.innerContainer}>{children}</View>
      </BlurView>
    </View>
  );
};

export default StackedCard;

const SHEET_RADIUS = 28;
const BORDER_WIDTH = 1;

const layerShadow = {
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 4,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    display: "flex",
  },
  layerThree: {
    position: "absolute",
    bottom: 24,
    width: "88%",
    height: "78%",
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: BORDER_WIDTH,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderBottomWidth: 0,
    ...layerShadow,
    overflow: "hidden",
  },
  layerTwo: {
    position: "absolute",
    bottom: 16,
    width: "92%",
    height: "85%",
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: BORDER_WIDTH,
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderBottomWidth: 0,
    ...layerShadow,
    overflow: "hidden",
  },
  layerOne: {
    position: "absolute",
    bottom: 8,
    width: "96%",
    height: "92%",
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: BORDER_WIDTH,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderBottomWidth: 0,
    ...layerShadow,
    overflow: "hidden",
  },
  topLayer: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: BORDER_WIDTH,
    borderColor: "rgba(255,255,255,0.8)",
    borderBottomWidth: 0,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 16,
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    // Add subtle inner shadow for depth
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
