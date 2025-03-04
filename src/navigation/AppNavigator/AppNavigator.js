// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/Splash";
import OnboardingScreen from "../../screens/Onboarding";
import AuthScreen from "../../screens/Auth/auth";
import VerificationScreen from "../../screens/Auth/verification";
import AddPhoneScreen from "../../screens/Auth/phone";
import ConsentScreen from "../../screens/Consent";
import AccountTypeScreen from "../../screens/Consent/accountType";
import CreateProfile from "../../screens/CreateProfile";
import ProfileFormScreen from "../../screens/CreateProfile/ProfileForm";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="AddPhoneScreen" component={AddPhoneScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="AccountType" component={AccountTypeScreen} />

      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />
    </Stack.Navigator>
  );
}
