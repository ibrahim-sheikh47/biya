import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your existing screens
import SplashScreen from "../../screens/Splash";
import OnboardingScreen from "../../screens/Onboarding";
import AuthScreen from "../../screens/Auth/auth";
import VerificationScreen from "../../screens/Auth/verification";
import AddPhoneScreen from "../../screens/Auth/phone";
import ConsentScreen from "../../screens/Consent";
import AccountTypeScreen from "../../screens/Consent/accountType";
import CreateProfile from "../../screens/CreateProfile";
import ProfileFormScreen from "../../screens/CreateProfile/ProfileForm";
import NotificationScreen from "../../screens/Notifications";
import DrawerNavigator, {
  AboutScreen,
  ProfileScreen,
  WalletScreen,
} from "../DrawerNavigator/DrawerNavigator";
import ProfileDetails from "../../screens/Live/ProfileDetails";
import YourProfile from "../../screens/DrawerScreens/YourProfile";
import AboutUs from "../../screens/DrawerScreens/AboutUs";
import PaymentScreen from "../../screens/Live/PaymentScreen";
import CommunityProb from "../../screens/DrawerScreens/CommunityProb";
import ChatDetailScreen from "../../screens/Chats/chatDetail";
import JokesAndQuranScreen from "../../screens/DrawerScreens/JokesAndQuran";
import HelpSupportScreen from "../../screens/DrawerScreens/HelpSupportScreen";

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
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />

      {/* Replace TabNavigator with StackNavigator */}
      <Stack.Screen name="Main" component={DrawerNavigator} />

      {/* Keep these screens at the root level for direct navigation */}
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="ProfileScreen" component={YourProfile} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="AboutScreen" component={AboutUs} />
      <Stack.Screen name="CommunityScreen" component={CommunityProb} />
      <Stack.Screen
        name="JokesAndQuranScreen"
        component={JokesAndQuranScreen}
      />
      <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
    </Stack.Navigator>
  );
}
