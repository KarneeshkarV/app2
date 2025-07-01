import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../../styles/globalStyles";

interface Props {
  children: ReactNode;
  style?: object;
}

const GradientBackground = ({ children, style }: Props) => (
  <LinearGradient
    colors={["#276040", "#3EC899"]}
    style={[globalStyles.gradientContainer, style]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    {children}
  </LinearGradient>
);

export default GradientBackground;
