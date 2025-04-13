"use client";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import NotificationScreen from "../../screens/Notifications";
import MainHeader from "../../components/MainHeader";
import TabNavigator from "../TabNavigator/TabNavigator";
import { useUser } from "../../context/UserContext";
import images from "../../constants/images";
import { RateUsModal } from "../../components/RateUsModal/RateUsModal";

// Custom Drawer Content Component
function CustomDrawerContent({ navigation, userName, accountType }) {
  const { user } = useUser();

  const displayName = user?.selectedProfile?.name || user?.name || "Guest";




  return (
    <View style={styles.drawerContainer}>
      {/* Status Bar Spacer - This creates space for the status bar */}
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Hi {displayName}!</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.closeDrawer()}
        >
          <Ionicons name="close" size={24} color="#0047FF" />
        </TouchableOpacity>
      </View>

      {/* Referral Banner */}
      <View style={styles.referralBanner}>
        <View style={styles.referralTextContainer}>
          <Text style={styles.referralTitle}>Refer and win</Text>
          <Text style={styles.referralSubtitle}>exciting rewards</Text>
          <TouchableOpacity style={styles.referButton}>
            <Text style={styles.referButtonText}>Refer now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={images.referImg}
          style={styles.giftImage}
          resizeMode="coverfill"
        />
      </View>

      {/* Menu Items */}
      <DrawerMenuItem
        title="Your profile"
        onPress={() => navigation.navigate("ProfileScreen")}
      />
      <DrawerMenuItem
        title="Manage payment"
        onPress={() => navigation.navigate("PaymentScreen")}
      />
      <DrawerMenuItem
        title="Biya Wallet"
        onPress={() => navigation.navigate("WalletScreen")}
      />
      <DrawerMenuItem
        title="Quran, Jokes, & more"
        onPress={() => navigation.navigate("JokesAndQuranScreen")}
      />
      <DrawerMenuItem
        title="About us"
        onPress={() => navigation.navigate("AboutScreen")}
      />
      <DrawerMenuItem
        title="Help & support"
        onPress={() => navigation.navigate("HelpSupportScreen")}
      />
      <DrawerMenuItem
        title="Community Problems"
        onPress={() => navigation.navigate("CommunityScreen")}
      />

      {/* App Version */}
      <Text style={styles.versionText}>App version: 1.0.0.</Text>

    </View>
  );
}

// Drawer Menu Item Component
function DrawerMenuItem({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuItemText}>{title}</Text>
      <Ionicons name="arrow-forward" size={24} color="#0047FF" />
    </TouchableOpacity>
  );
}

export const ProfileScreen = () => (
  <Text style={styles.screenText}>Profile</Text>
);

export const WalletScreen = () => <Text style={styles.screenText}>Wallet</Text>;

export const AboutScreen = () => <Text style={styles.screenText}>About</Text>;

// Create drawer navigator
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user } = useUser();
  // Get status bar height for different platforms
  const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

  return (
    <>
      <StatusBar backgroundColor="#FF0080" barStyle="light-content" />
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            userName={user.selectedProfile?.name || user.name}
            accountType={user.accountType}
          />
        )}
        screenOptions={{
          drawerStyle: {
            width: "85%",
            // This ensures the drawer starts below the status bar
            marginTop: statusBarHeight,
          },
          header: ({ navigation, route }) => (
            <MainHeader
              name={user.selectedProfile?.name || user.name}
              onMenuPress={() => navigation.openDrawer()}
              accountType={user.accountType}
              profiles={user.profiles}
            />
          ),
        }}
      >
        {/* Use your TabNavigator as the main screen */}
        <Drawer.Screen name="TabNavigator" component={TabNavigator} />

        {/* Add other screens that should be accessible from the drawer */}
        <Drawer.Screen name="Notification" component={NotificationScreen} />

        {/* Add other screens here */}
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  // Styles remain the same with additions
  drawerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  // Add this new style for status bar spacing
  statusBarSpacer: {
    height: 0, // The drawer already has marginTop from screenOptions
    backgroundColor: "#FF0080",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  drawerHeaderText: {
    fontSize: 28,
    fontFamily: "KaushanScript-Regular",
    color: "#FF0080",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  referralBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFE0EB",
    margin: 20,
    paddingVertical: 16,
    borderRadius: 20,
  },
  referralTextContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  referralSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  referButton: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0047FF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  referButtonText: {
    color: "#0047FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  giftImage: {
    width: 100,
    height: 80,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  menuItemText: {
    fontSize: 18,
    color: "#000",
  },
  versionText: {
    textAlign: "center",
    color: "#888",
    marginTop: "auto",
    marginBottom: 20,
    fontSize: 14,
  },
  screenText: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});