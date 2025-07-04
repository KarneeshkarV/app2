import React, { ReactNode, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../../styles/globalStyles";

interface Props {
  children: ReactNode;
  style?: object;
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const GradientBackground = ({ children, style }: Props) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 8000, // 8 seconds for full cycle
        useNativeDriver: false,
      }),
    ).start();
  }, [progress]);

  // First gradient state (left card) - solid green
  const colorTop1 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#22C55E", "#22C55E", "#1E40AF", "#22C55E"], // Green -> Green -> Blue -> Green
  });

  const colorBottom1 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#16A34A", "#0891B2", "#1E3A8A", "#16A34A"], // Dark Green -> Cyan -> Dark Blue -> Dark Green
  });

  // Second gradient state (middle card) - green to blue diagonal
  const colorTop2 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#22C55E", "#22C55E", "#0891B2", "#22C55E"], // Green -> Green -> Cyan -> Green
  });

  const colorBottom2 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#0891B2", "#1E40AF", "#1E3A8A", "#0891B2"], // Cyan -> Blue -> Dark Blue -> Cyan
  });

  // Third gradient state (right card) - green to dark blue
  const colorTop3 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#16A34A", "#0891B2", "#0891B2", "#16A34A"], // Dark Green -> Cyan -> Cyan -> Dark Green
  });

  const colorBottom3 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#1E3A8A", "#1E3A8A", "#1E3A8A", "#1E3A8A"], // Dark Blue (consistent)
  });

  // Animate gradient direction
  const startX = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0, 0.3, 0.7, 0], // Shifts the gradient start point
  });

  const startY = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0, 0, 0, 0],
  });

  const endX = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [1, 0.7, 0.3, 1], // Shifts the gradient end point
  });

  const endY = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [1, 1, 1, 1],
  });

  // Create multiple color stops for more complex gradients
  const gradientColors = [
    colorTop1,
    colorTop2,
    colorBottom2,
    colorBottom1,
    colorTop3,
    colorBottom3,
  ];

  // Simplified approach - use 3 colors that transition between the states
  const color1 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#22C55E", "#22C55E", "#0891B2", "#22C55E"], // Top color
  });

  const color2 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#16A34A", "#0891B2", "#1E40AF", "#16A34A"], // Middle color
  });

  const color3 = progress.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["#0891B2", "#1E40AF", "#1E3A8A", "#0891B2"], // Bottom color
  });

  const start = {
    x: startX,
    y: startY,
  };

  const end = {
    x: endX,
    y: endY,
  };

  return (
    <AnimatedGradient
      colors={[color1, color2, color3]}
      start={start}
      end={end}
      style={[globalStyles.gradientContainer, style]}
    >
      {children}
    </AnimatedGradient>
  );
};

export default GradientBackground;
