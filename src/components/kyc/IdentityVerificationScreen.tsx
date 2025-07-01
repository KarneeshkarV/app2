import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";

const DocumentVerificationItem = ({
  title,
  subtitle,
  icon,
  isCompleted,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.documentItem, isCompleted && styles.completedItem]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.documentIconContainer}>
      <View style={[styles.documentIcon, isCompleted && styles.completedIcon]}>
        <Ionicons
          name={icon}
          size={20}
          color={isCompleted ? colors.primary : colors.white}
        />
      </View>
      <View style={styles.documentContent}>
        <Text
          style={[styles.documentTitle, isCompleted && styles.completedTitle]}
        >
          {title}
        </Text>
        <Text style={styles.documentSubtitle}>{subtitle}</Text>
      </View>
    </View>

    <View style={styles.uploadContainer}>
      {isCompleted ? (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
          <Text style={styles.uploadedText}>Uploaded</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
          <Ionicons
            name="cloud-upload-outline"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.uploadText}>Upload Your {title}</Text>
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

const IdentityVerificationScreen = ({ navigation }) => {
  const [selfieCompleted, setSelfieCompleted] = useState(false);
  const [documentCompleted, setDocumentCompleted] = useState(false);

  const handleBack = () => navigation.goBack();

  const handleNext = () => {
    if (!selfieCompleted || !documentCompleted) {
      Alert.alert(
        "Upload Required",
        "Please complete both selfie and document uploads to continue.",
      );
      return;
    }
    navigation.navigate("AccreditationLevel");
  };

  const handleSkip = () => {
    navigation.navigate("AccreditationLevel");
  };

  const handleSelfieUpload = () => {
    // Simulate upload - in real app, you'd integrate with Persona SDK
    Alert.alert(
      "Selfie Upload",
      "This would integrate with Persona SDK for selfie capture",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Simulate Upload",
          onPress: () => setSelfieCompleted(true),
        },
      ],
    );
  };

  const handleDocumentUpload = () => {
    // Simulate upload - in real app, you'd integrate with Persona SDK
    Alert.alert(
      "Document Upload",
      "This would integrate with Persona SDK for document capture",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Simulate Upload",
          onPress: () => setDocumentCompleted(true),
        },
      ],
    );
  };

  const isFormValid = () => selfieCompleted && documentCompleted;

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <GradientBackground>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 10/11</Text>
          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        <StackedCard>
          <View style={styles.contentContainer}>
            <View style={styles.topContent}>
              <Text style={globalStyles.title}>
                Verify your identity with Persona
              </Text>

              <DocumentVerificationItem
                title="Selfie"
                subtitle="Selfie with your front camera to verify your identity"
                icon="person-outline"
                isCompleted={selfieCompleted}
                onPress={handleSelfieUpload}
              />

              <DocumentVerificationItem
                title="Government ID Scan"
                subtitle="Take a Passport/other government ID"
                icon="document-text-outline"
                isCompleted={documentCompleted}
                onPress={handleDocumentUpload}
              />
            </View>

            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: isFormValid()
                      ? colors.primaryBtn
                      : colors.lightGray,
                  },
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
                disabled={!isFormValid()}
              >
                <Text
                  style={[
                    globalStyles.buttonText,
                    { color: isFormValid() ? colors.white : colors.gray },
                  ]}
                >
                  {isFormValid() ? "Next" : "Confirm"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.privacyContainer}>
                <Text style={styles.privacyText}>
                  <Text style={styles.privacyLink}>Learn more</Text> here about
                  how we protect your privacy.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </StackedCard>
      </GradientBackground>
    </SafeAreaView>
  );
};

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
    justifyContent: "space-between",
  },
  topContent: {
    flex: 1,
  },
  documentItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  completedItem: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  documentIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  documentIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: colors.white,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 4,
  },
  completedTitle: {
    color: colors.primary,
  },
  documentSubtitle: {
    fontSize: 14,
    color: colors.gray,
  },
  uploadContainer: {
    alignItems: "center",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  uploadText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadedText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: "500",
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

export default IdentityVerificationScreen;
