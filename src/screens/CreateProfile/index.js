import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import images from "../../constants/images";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import profileSections from "../../data/profileSections";
import { Ionicons } from "@expo/vector-icons"; // Import icons

const CreateProfile = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // State to track completion percentage of each section
  const [progress, setProgress] = useState({});

  // Update progress when returning from ProfileForm
  useEffect(() => {
    if (route.params?.sectionId) {
      setProgress((prev) => ({
        ...prev,
        [route.params.sectionId]: route.params.completionPercentage,
      }));
    }
  }, [route.params]);

  const ProfileCard = ({ title, subtitle, icon, section }) => {
    const completion = progress[section.id] || 0; // Default 0%

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ProfileForm", { section })}
      >
        <View style={styles.cardContent}>
          <View style={styles.topRow}>
            <View style={styles.iconContainer}>
              {icon || (
                <Ionicons name="person-outline" size={24} color="black" />
              )}
              {completion === 100 && (
                <Ionicons
                  name="checkmark-circle"
                  style={{ position: "absolute", bottom: -3, right: -10 }}
                  size={20}
                  color="#02BC7D"
                />
              )}
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{completion}%</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <Text style={styles.addButton}>{completion > 0 ? "Edit" : "Add+"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Create profile</Text>
          <Text style={styles.subText}>
            Fill in bride/groom's details for a best possible match
          </Text>
        </View>
        <Image source={images.profileBg} style={{ width: 94, height: 81 }} />
      </View>
      <View style={styles.cardsContainer}>
        {profileSections.map((section) => (
          <ProfileCard
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            section={section}
          />
        ))}
      </View>
    </Container>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subText: { fontSize: 14, color: "#3F3F3F", lineHeight: 24, width: 183 },
  cardsContainer: {
    marginTop: 30,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 160,
    backgroundColor: "#FFEDF5",
    borderColor: "#FFD5E8",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 16,
    position: "relative",
  },
  cardContent: { padding: 12 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: { marginRight: 10, position: "relative" },
  percentageContainer: {
    backgroundColor: "#FFB0D5",
    padding: 5,
    borderRadius: 7,
  },
  percentageText: { fontSize: 12, fontFamily: "Poppins-Medium", color: "#fff" },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#828282",
    lineHeight: 16,
    width: 130,
    marginTop: 3,
  },
  addButton: {
    position: "absolute",
    bottom: 15,
    left: 12,
    fontSize: 14,
    color: "#0C3BDE",
    fontFamily: "Poppins-SemiBold",
  },
  checkIcon: { position: "absolute", bottom: 15, right: 12 },
});
