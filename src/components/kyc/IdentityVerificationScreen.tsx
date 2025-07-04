import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Inquiry, Environment } from "react-native-persona";

const DocItem = ({ title, subtitle, icon, done, onPress, loading = false }) => (
  <TouchableOpacity
    style={[styles.docItem, done && { borderColor: colors.primaryLight }]}
    onPress={onPress}
    disabled={loading}
  >
    <View style={styles.docHeader}>
      <View style={[styles.docIcon, done && { backgroundColor: colors.white }]}>
        <Ionicons
          name={icon}
          size={20}
          color={done ? colors.primary : colors.white}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.docTitle, done && { color: colors.primary }]}>
          {title}
        </Text>
        <Text style={styles.docSub}>{subtitle}</Text>
      </View>
    </View>
    <View style={styles.uploadContainer}>
      {loading ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      ) : done ? (
        <View style={styles.completed}>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
          <Text style={styles.uploadedText}>Verified</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadBtn} onPress={onPress}>
          <Ionicons
            name="cloud-upload-outline"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.uploadText}>Verify {title}</Text>
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

const IdentityVerificationScreen = ({ navigation }) => {
  const [selfieVerified, setSelfieVerified] = useState(false);
  const [docVerified, setDocVerified] = useState(false);
  const [loading, setLoading] = useState({ selfie: false, doc: false });
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [inquiryId, setInquiryId] = useState(null);

  // Replace with your actual Persona template ID from the dashboard
  const PERSONA_TEMPLATE_ID = "itmpl_your_actual_template_id_here";

  const isValid = selfieVerified && docVerified;

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message:
              "This app needs access to camera for identity verification",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        );
        setHasCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === "granted");
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setHasCameraPermission(false);
    }
  };

  const handlePersonaInquiry = async (verificationType) => {
    try {
      setLoading((prev) => ({ ...prev, [verificationType]: true }));

      // Use the correct Persona SDK API
      const inquiry = Inquiry.fromTemplate(PERSONA_TEMPLATE_ID)
        .environment(__DEV__ ? Environment.SANDBOX : Environment.PRODUCTION)
        .onComplete((inquiryId, status, fields) => {
          console.log("Persona verification complete:", {
            inquiryId,
            status,
            fields,
          });
          setInquiryId(inquiryId);

          if (status === "completed") {
            if (verificationType === "selfie") {
              setSelfieVerified(true);
            } else if (verificationType === "doc") {
              setDocVerified(true);
            }
            Alert.alert("Success", "Verification completed successfully!");
          } else {
            Alert.alert("Verification Failed", "Please try again.");
          }
          setLoading((prev) => ({ ...prev, [verificationType]: false }));
        })
        .onCancelled((inquiryId, sessionToken) => {
          console.log("Persona verification cancelled:", inquiryId);
          Alert.alert("Cancelled", "Verification was cancelled.");
          setLoading((prev) => ({ ...prev, [verificationType]: false }));
        })
        .onError((error) => {
          console.error("Persona verification error:", error);
          Alert.alert("Error", "An error occurred during verification.");
          setLoading((prev) => ({ ...prev, [verificationType]: false }));
        })
        .build();

      // Start the inquiry
      inquiry.start();
    } catch (error) {
      console.error("Error starting Persona inquiry:", error);
      Alert.alert("Error", "Failed to start verification process.");
      setLoading((prev) => ({ ...prev, [verificationType]: false }));
    }
  };

  const handleSelfieVerification = async () => {
    if (!hasCameraPermission) {
      Alert.alert(
        "Permission Required",
        "Camera access is required for selfie verification.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Settings", onPress: () => requestCameraPermission() },
        ],
      );
      return;
    }

    await handlePersonaInquiry("selfie");
  };

  const handleDocumentScan = async () => {
    if (!hasCameraPermission) {
      Alert.alert(
        "Permission Required",
        "Camera access is required for document scanning.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Settings", onPress: () => requestCameraPermission() },
        ],
      );
      return;
    }

    await handlePersonaInquiry("doc");
  };

  const handleNext = async () => {
    if (!isValid) {
      Alert.alert(
        "Verification Required",
        "Please complete both identity verification steps.",
      );
      return;
    }

    // Optional: Send verification results to your backend
    try {
      if (inquiryId) {
        console.log("Sending verification results to backend:", inquiryId);
        // await sendVerificationToBackend(inquiryId);
      }
    } catch (error) {
      console.error("Error sending verification to backend:", error);
    }

    navigation.navigate("AccreditationLevel");
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Verification",
      "Identity verification is recommended for account security. Are you sure you want to skip?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Skip",
          onPress: () => navigation.navigate("AccreditationLevel"),
        },
      ],
    );
  };

  return (
    <KycScreenLayout
      step={10}
      totalSteps={11}
      title="Verify your identity"
      subtitle=""
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: isValid ? colors.primary : colors.lightGray,
                opacity: loading.selfie || loading.doc ? 0.7 : 1,
              },
            ]}
            onPress={handleNext}
            disabled={!isValid || loading.selfie || loading.doc}
          >
            <Text
              style={[
                styles.nextButtonText,
                { color: isValid ? colors.white : colors.gray },
              ]}
            >
              {isValid ? "Continue" : "Complete Verification"}
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      <View style={styles.verificationContainer}>
        <DocItem
          title="Live Selfie"
          subtitle="Take a live selfie to verify your identity"
          icon="person-outline"
          done={selfieVerified}
          loading={loading.selfie}
          onPress={handleSelfieVerification}
        />

        <DocItem
          title="Government ID"
          subtitle="Scan your passport, driver's license, or ID card"
          icon="document-text-outline"
          done={docVerified}
          loading={loading.doc}
          onPress={handleDocumentScan}
        />
      </View>
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  verificationContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  docItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  docHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  docIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 4,
  },
  docSub: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 18,
  },
  uploadContainer: {
    alignItems: "center",
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  uploadText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
  completed: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadedText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: "600",
  },
  loading: {
    paddingVertical: 8,
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray,
    fontStyle: "italic",
  },
  nextButton: {
    borderRadius: 60,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  securityText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 8,
    fontStyle: "italic",
  },
});

export default IdentityVerificationScreen;
