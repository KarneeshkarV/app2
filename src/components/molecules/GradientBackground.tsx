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
        duration: 10000,
        useNativeDriver: false,
      }),
    ).start();
  }, [progress]);

  const colorLeft = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#276040", "#3EC899", "#276040"],
  });

  const colorRight = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#3EC899", "#276040", "#3EC899"],
  });

  const start = {
    x: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    y: 0,
  };

  const end = {
    x: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    y: 1,
  };

  return (
    <AnimatedGradient
      colors={[colorLeft, colorRight]}
      start={start}
      end={end}
      style={[globalStyles.gradientContainer, style]}
    >
      {children}
    </AnimatedGradient>
  );
};

export default GradientBackground;
