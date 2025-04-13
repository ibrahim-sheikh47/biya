import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const ProfileCard = ({
  id,
  name,
  location,
  profession,
  isOnline,
  isNew,
  age,
  skinColor,
  nationality,
  bornIn,
  height,
  appearance,
  fatherName,
  motherName,
  isFavorite: initialFavorite, // Receive initial favorite state
}) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev); // Toggle state
  };

  const handleViewProfile = () => {
    navigation.navigate("ProfileDetails", {
      profile: {
        id,
        name,
        location,
        profession,
        isOnline,
        isNew,
        age,
        skinColor,
        nationality,
        bornIn,
        height,
        appearance,
        fatherName,
        motherName,
      },
    });
  };

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>{name}</Text>
          {isOnline && (
            <View style={[styles.onlineIndicator, { borderColor: "#10B981" }]}>
              <View
                style={[
                  styles.onlineIndicatorInner,
                  {
                    backgroundColor: "#10B981",
                  },
                ]}
              />
            </View>
          )}
        </View>

        <View style={styles.profileDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={18} color={"#FA80B9"} />
            <Text style={styles.detailText}>{location}</Text>
          </View>

          <View style={styles.detailItem}>
            <FontAwesome5 name="briefcase" size={16} color={"#FA80B9"} />
            <Text style={styles.detailText}>{profession}</Text>
          </View>
        </View>

        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Just joined</Text>
          </View>
        )}
      </View>

      <View style={styles.profileActions}>
        {/* Favorite Button */}
        <TouchableOpacity style={styles.actionButton} onPress={toggleFavorite}>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={20}
            color={"#FA80B9"}
          />
        </TouchableOpacity>

        {/* Add Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleViewProfile}
        >
          <Ionicons name="add" size={24} color={"#FA80B9"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#FFD5E8",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "white",
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  onlineIndicator: {
    width: 20,
    height: 20,
    borderRadius: 11,
    borderWidth: 2,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIndicatorInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  profileDetails: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginLeft: 5,
    color: "#FA80B9",
  },
  newBadge: {
    backgroundColor: "#CED8F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  newBadgeText: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  profileActions: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 24,
    backgroundColor: "#FFF0F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
