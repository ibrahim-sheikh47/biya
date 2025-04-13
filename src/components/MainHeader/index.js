"use client";

import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import icons from "../../constants/icons";
import { useUser } from "../../context/UserContext";

const { width } = Dimensions.get("window");

export default function MainHeader({ onMenuPress }) {
  const navigation = useNavigation();
  const { user, selectProfile } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedName, setSelectedName] = useState("Guest");

  // Check if user is guardian or consultant
  const isGuardianOrConsultant =
    user &&
    (user.accountType === "guardian" || user.accountType === "consultant");

  // Sample profiles for testing - replace with your actual profiles
  const profiles =
    user?.profiles?.length > 0
      ? user.profiles
      : [
          { id: "1", name: "Mominul Hassan" },
          { id: "2", name: "Rubina Hassan" },
        ];

  // Initialize selected name when component mounts or when user/selectedProfile changes
  useEffect(() => {
    if (user?.selectedProfile?.name) {
      setSelectedName(user.selectedProfile.name);
    } else if (user?.name) {
      setSelectedName(user.name);
    }
  }, [user]);

  // Get first name only for the header
  const firstName = selectedName.split(" ")[0];

  const handleProfileSelect = (profile) => {
    // Update the selected profile in context
    selectProfile(profile.id);

    // Update the local state with the selected name
    setSelectedName(profile.name);

    closeDropdown();
  };

  const openDropdown = () => {
    setShowDropdown(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowDropdown(false);
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Image source={icons.menuIcon} style={{ width: 24, height: 20 }} />
      </TouchableOpacity>

      {isGuardianOrConsultant ? (
        <TouchableOpacity style={styles.nameContainer} onPress={openDropdown}>
          <Text style={styles.headerTitle}>Hi {firstName}!</Text>
          <Ionicons
            name="caret-down"
            size={22}
            color={colors.blue}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
      ) : (
        <Text style={styles.headerTitle}>Hi {firstName}!</Text>
      )}

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => {
          navigation.navigate("Notification");
        }}
      >
        <Ionicons
          name="notifications-outline"
          size={28}
          color={colors.secondary}
        />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>1</Text>
        </View>
      </TouchableOpacity>

      {/* Profile Selection Modal */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <Animated.View
            style={[styles.dropdownContainer, { opacity: fadeAnim }]}
          >
            <View style={styles.dropdownContent}>
              {profiles.map((profile, index) => (
                <TouchableOpacity
                  key={profile.id}
                  style={[
                    styles.profileOption,
                    index < profiles.length - 1 && styles.profileDivider,
                    // Highlight currently selected profile
                    selectedName === profile.name && styles.activeProfile,
                  ]}
                  onPress={() => handleProfileSelect(profile)}
                >
                  <Text
                    style={[
                      styles.profileName,
                      selectedName === profile.name && styles.activeProfileText,
                    ]}
                  >
                    {profile.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    marginTop: 40,
    backgroundColor: "white",
  },
  menuButton: {
    padding: 5,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "KaushanScript-Regular",
    color: colors.primary,
    marginHorizontal: 10,
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  notificationButton: {
    padding: 5,
    position: "relative",
    marginLeft: "auto",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.secondary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dropdownContainer: {
    width: width * 0.9,
    marginTop: 90,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownHeader: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: "relative",
  },
  dropdownTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "KaushanScript-Regular",
  },
  triangleIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    transform: [{ rotate: "180deg" }],
  },
  dropdownContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: 250, // Limit height and enable scrolling if many profiles
  },
  profileOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  profileDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  profileName: {
    fontSize: 16,
    color: "#333",
  },
  activeProfile: {
    backgroundColor: colors.primary + "15", // Light tint of primary color
  },
  activeProfileText: {
    color: colors.primary,
    fontWeight: "600",
  },
});
