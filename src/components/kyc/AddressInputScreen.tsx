import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, colors } from "../../styles/globalStyles";
import StackedCard from "../molecules/StackedCard";
import GradientBackground from "../molecules/GradientBackground";
const AddressInputScreen = ({ navigation, route }) => {
  const { selectedCountry } = route.params || {};

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    // Navigate directly to LegalAddress screen
    navigation.navigate("LegalAddress", {
      selectedCountry,
    });
  };

  const handleSkip = () => {
    navigation.navigate("LegalAddress", {
      selectedCountry,
    });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <GradientBackground>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.stepText}>Step 1/11</Text>

          <TouchableOpacity
            style={styles.skipHeaderButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipHeaderText}>Save & Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content Card */}
        <StackedCard>
          <View style={styles.contentContainer}>
            <View style={styles.topContent}>
              <Text style={globalStyles.title}>
                Select your country of citizenship
              </Text>
              <Text style={globalStyles.subtitle}>Type your address</Text>

              {/* Selected Country Display */}
              {selectedCountry && (
                <TouchableOpacity
                  style={styles.selectedCountryContainer}
                  onPress={() =>
                    navigation.navigate("CountrySelection", { selectedCountry })
                  }
                >
                  <View style={styles.countryItem}>
                    <Text style={styles.flagEmoji}>
                      {selectedCountry.label.split(" ")[0]}
                    </Text>
                    <Text style={styles.countryText}>
                      {selectedCountry.label.split(" ").slice(1).join(" ")}
                    </Text>
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={colors.gray}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.bottomContent}>
              {/* Next Button */}
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={globalStyles.buttonText}>Next</Text>
              </TouchableOpacity>

              {/* Privacy Link */}
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

const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 10,
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
    marginLeft: 8,
    fontWeight: "500",
  },
  skipHeaderButton: {
    marginLeft: "auto",
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
  selectedCountryContainer: {
    marginVertical: 20,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  countryText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    fontWeight: "500",
  },
  bottomContent: {
    paddingBottom: 20,
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
};

export default AddressInputScreen;
