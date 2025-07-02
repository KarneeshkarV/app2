import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colors } from "../../styles/globalStyles";

const SHEET_RADIUS = 28;

interface StackedCardProps {
  style?: StyleProp<ViewStyle>;
  topOffset?: number;
  /** Optional progress between 0 and 1 */
  progress?: number;
}

const StackedCard: React.FC<StackedCardProps> = ({
  children,
  style,
  topOffset = 200,
  progress,
}) => {
  const pct = Math.min(Math.max(progress ?? 0, 0), 1) * 100 + "%";

  return (
    <View
      style={[styles.container, { top: topOffset }]}
      pointerEvents="box-none"
    >
      <View style={styles.layerTwo} />
      <View style={styles.layerOne} />
      <View style={[styles.topLayer, style]}>
        {progress != null && (
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width: pct,
                },
              ]}
            />
          </View>
        )}
        <View style={[styles.content, progress != null && styles.contentWithProgress]}>
          {children}
        </View>
      </View>
    </View>
  );
};

export default StackedCard;

const shadow = {
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
    alignItems: "center",
  },
  layerTwo: {
    position: "absolute",
    bottom: 16,
    width: "92%",
    height: "85%",
    borderRadius: SHEET_RADIUS,
    backgroundColor: "rgba(255,255,255,0.3)",
    ...shadow,
    opacity: 0.6,
  },
  layerOne: {
    position: "absolute",
    bottom: 8,
    width: "96%",
    height: "92%",
    borderRadius: SHEET_RADIUS,
    backgroundColor: "rgba(255,255,255,0.5)",
    ...shadow,
    opacity: 0.8,
  },
  topLayer: {
    width: "100%",
    height: "100%",
    borderRadius: SHEET_RADIUS,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
    overflow: "hidden", // Ensures progress bar doesn't overflow the rounded corners
  },
  content: {
    flex: 1,
    padding: 24,
  },
  contentWithProgress: {
    paddingTop: 30, // Adjusted for slightly taller progress bar
  },
  // Progress bar that curves with the stacked card
  track: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6, // Slightly taller for better visibility of the curve
    backgroundColor: colors.lightGray,
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    borderBottomLeftRadius: 3, // Half of height for smooth curve
    borderBottomRightRadius: 3,
  },
  // The dynamic fill that curves with the track
  fill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    borderBottomLeftRadius: 3, // Matches track curvature
    borderBottomRightRadius: 3,
  },
});
