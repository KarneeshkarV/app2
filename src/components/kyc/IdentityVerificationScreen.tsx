import React, { useState } from "react";
import { TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KycScreenLayout } from "../molecules/KycScreenLayout";
import { PrivacyLink } from "../molecules/PrivacyLink";
import { colors } from "../../styles/globalStyles";

const DocItem = ({ title, subtitle, icon, done, onPress }) => (
  <TouchableOpacity
    style={[styles.docItem, done && { borderColor: colors.primaryLight }]}
    onPress={onPress}
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
      {done ? (
        <View style={styles.completed}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.uploadedText}>Uploaded</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadBtn} onPress={onPress}>
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
  const [selfie, setSelfie] = useState(false);
  const [doc, setDoc] = useState(false);
  const isValid = selfie && doc;

  const handleSelfie = () =>
    Alert.alert("Selfie Upload", "Simulate upload?", [
      { text: "Cancel", style: "cancel"},
      { text: "OK", onPress: ()=>setSelfie(true) }
    ]);
  const handleDoc = () =>
    Alert.alert("Document Upload", "Simulate upload?", [
      { text: "Cancel", style: "cancel"},
      { text: "OK", onPress: ()=>setDoc(true) }
    ]);
  const handleNext = () => {
    if (!isValid) {
      Alert.alert("Upload Required", "Please complete both uploads.");
      return;
    }
    navigation.navigate("AccreditationLevel");
  };
  const handleSkip = () => navigation.navigate("AccreditationLevel");

  return (
    <KycScreenLayout
      step={10}
      totalSteps={11}
      title="Verify your identity with Persona"
      onBack={() => navigation.goBack()}
      onSkip={handleSkip}
      bottom={
        <>
          <TouchableOpacity
            style={{
              backgroundColor: isValid ? colors.primary : colors.lightGray,
              borderRadius: 60,
              paddingVertical: 16,
              alignItems: "center",
            }}
            onPress={handleNext}
            disabled={!isValid}
          >
            <Text style={{
              color: isValid ? colors.white : colors.gray,
              fontSize: 16,
              fontWeight: "600"
            }}>
              {isValid ? "Next" : "Confirm"}
            </Text>
          </TouchableOpacity>
          <PrivacyLink />
        </>
      }
    >
      <DocItem
        title="Selfie"
        subtitle="Selfie with your front camera"
        icon="person-outline"
        done={selfie}
        onPress={handleSelfie}
      />
      <DocItem
        title="Government ID Scan"
        subtitle="Passport / ID card"
        icon="document-text-outline"
        done={doc}
        onPress={handleDoc}
      />
    </KycScreenLayout>
  );
};

const styles = StyleSheet.create({
  docItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
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
  },
  uploadedText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default IdentityVerificationScreen;
