import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import KYCWelcomeScreen from "../components/kyc/KYCWelcomeScreen";
import CountrySelectionScreen from "../components/kyc/CountrySelectionScreen";
import LegalAddressScreen from "../components/kyc/LegalAddressScreen";
import BirthdayScreen from "../components/kyc/BirthdayScreen";
import PhoneNumberScreen from "../components/kyc/PhoneNumberScreen";
import PlaceOfBirthScreen from "../components/kyc/PlaceOfBirthScreen";
import EmiratesIdScreen from "../components/kyc/EmiratesIdScreen";
import SourceOfFundsScreen from "../components/kyc/SourceOfFundsScreen";
import EmploymentStatusScreen from "../components/kyc/EmploymentStatusScreen";
import PoliticallyExposedPersonScreen from "../components/kyc/PoliticallyExposedPersonScreen";
import IdentityVerificationScreen from "../components/kyc/IdentityVerificationScreen";
import AccreditationLevelScreen from "../components/kyc/AccreditationLevelScreen";
import KYCSuccessScreen from "../components/kyc/KYCSuccessScreen";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="KYCWelcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          // Apply the smooth iOS-style slide animation to all screens
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="KYCWelcome" component={KYCWelcomeScreen} />
        <Stack.Screen
          name="CountrySelection"
          component={CountrySelectionScreen}
        />
        <Stack.Screen name="LegalAddress" component={LegalAddressScreen} />
        <Stack.Screen name="Birthday" component={BirthdayScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="PlaceOfBirth" component={PlaceOfBirthScreen} />
        <Stack.Screen name="EmiratesId" component={EmiratesIdScreen} />
        <Stack.Screen name="SourceOfFunds" component={SourceOfFundsScreen} />
        <Stack.Screen
          name="EmploymentStatus"
          component={EmploymentStatusScreen}
        />
        <Stack.Screen
          name="PoliticallyExposedPerson"
          component={PoliticallyExposedPersonScreen}
        />
        <Stack.Screen
          name="IdentityVerification"
          component={IdentityVerificationScreen}
        />
        <Stack.Screen
          name="AccreditationLevel"
          component={AccreditationLevelScreen}
        />
        {/* Special transition for the final success screen */}
        <Stack.Screen
          name="KYCSuccess"
          component={KYCSuccessScreen}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureDirection: "vertical", // Match gesture to animation
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
