import React, { ReactNode } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "./GradientBackground";
import StackedCard from "./StackedCard";
import { globalStyles, colors } from "../../styles/globalStyles";

interface Props {
  step?: number; // e.g. 3
  totalSteps?: number; // e.g. 11
  title: string; // screen title
  subtitle?: string; // optional subtitle
  onBack: () => void; // goBack
  onSkip?: () => void; // optional Save & Skip
  children: ReactNode; // form fields
  bottom: ReactNode; // Next / Confirm button + privacy link
}

export const KycScreenLayout: React.FC<Props> = ({
  step,
  totalSteps,
  title,
  subtitle,
  onBack,
  onSkip,
  children,
  bottom,
}) => (
  <SafeAreaView style={globalStyles.container}>
    <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        {step != null && totalSteps != null && (
          <Text style={styles.stepText}>
            Step {step}/{totalSteps}
          </Text>
        )}
        {onSkip && (
          <TouchableOpacity onPress={onSkip} style={styles.skipHeaderButton}>
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <StackedCard>
        <View style={styles.cardContent}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={globalStyles.title}>{title}</Text>
            {subtitle && <Text style={globalStyles.subtitle}>{subtitle}</Text>}
            {children}
          </ScrollView>

          {bottom}
        </View>
      </StackedCard>
    </GradientBackground>
  </SafeAreaView>
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
    backgroundColor: "rgba(255,255,255,0.2)",
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
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
});
