import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const FavoriteCard = ({ id, name, location, profession, onRemove }) => {
  return (
    <View style={styles.favoriteCard}>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{name}</Text>
        <View style={styles.favoriteDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#FF4B91" />
            <Text style={styles.detailText}>{location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="briefcase-outline" size={16} color="#FF4B91" />
            <Text style={styles.detailText}>{profession}</Text>
          </View>
        </View>
      </View>
      <View style={styles.favoriteActions}>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble-ellipses" size={18} color="#FA80B9" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(id)}
        >
          <FontAwesome name="minus" size={15} color="#FA80B9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  favoriteCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    borderColor: "#FFD5E8",
    borderWidth: 1,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  favoriteDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#FA80B9",
    marginLeft: 4,
    fontFamily: "Poppins-Medium",
  },
  favoriteActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatButton: {
    marginRight: 15,
    backgroundColor: "#FFEDF5",
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEDF5",
    borderRadius: 100,
  },
});
