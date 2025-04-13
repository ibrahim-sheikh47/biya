import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Container from "../../components/Container";
import images from "../../constants/images";
import Button from "../../components/Button/Button";
import CustomModalize from "../../components/Modalize";
import icons from "../../constants/icons";

const ProfileDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile } = route.params;
  const modalizeRef = useRef(null);
  const modalizeRef2 = useRef(null);

  const userName = "Ibrahim";

  const openModalize = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };
  const openModalize2 = () => {
    if (modalizeRef2.current) {
      modalizeRef2.current.open();
    }
  };

  return (
    <Container pd={0}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header title={"Profile details"} style={{ marginTop: 0 }} />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <FontAwesome name="heart-o" size={16} color="#0C3BDE" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="share-social-outline" size={16} color="#0C3BDE" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="download-outline" size={16} color="#0C3BDE" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Background Image with Content Overlay */}
      <ScrollView
        style={styles.backgroundContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Image source={images.bgImg} style={styles.backgroundImage} />

        {/* Profile Image */}
        <Image source={images.Pimg1} style={styles.pImg} />

        {/* Name */}
        <Text style={styles.name}>{profile.name}</Text>

        {/* Quick Info */}
        <View style={styles.quickInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="location" size={18} color="#FF1493" />
            <Text style={styles.infoText}>{profile.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={18} color="#FF1493" />
            <Text style={styles.infoText}>{profile.age}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={18} color="#FF1493" />
            <Text style={styles.infoText}>{profile.skinColor}</Text>
          </View>
        </View>

        {/* Match Card with text inside the image */}
        <ImageBackground
          source={images.PbgImg}
          style={styles.matchImageBackground}
          resizeMode="contain"
        >
          <View style={styles.matchContentOverlay}>
            <Image source={images.matchedImg} style={styles.matchedImage} />
            <View style={styles.matchNames}>
              <Text style={styles.matchName}>{profile.name}</Text>
              <Text style={styles.matchAmp}>&</Text>
              <Text style={styles.matchName}>{userName}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Personal Details */}
        <View style={styles.personalDetails}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.detailsGrid}>
            <DetailRow label="Nationality" value={profile.nationality} />
            <DetailRow label="Born in" value={profile.bornIn} />
            <DetailRow label="Height" value={profile.height} />
            <DetailRow label="Appearance" value={profile.appearance} />
            <DetailRow label="Father's Name" value={profile.fatherName} />
            <DetailRow label="Mother's Name" value={profile.motherName} />
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <View style={{ flex: 1 }}>
            <Button
              title={"Digital Gifts"}
              style={{ backgroundColor: "transparent", borderColor: "#0C3BDE" }}
              textStyle={{ color: "#0C3BDE" }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title={"Request Chat"}
              style={{ backgroundColor: "#0C3BDE" }}
              onPress={openModalize}
            />
          </View>
        </View>
      </ScrollView>

      {/* Custom Modalize for Request Chat */}
      <CustomModalize
        ref={modalizeRef}
        height={400}
        icon={
          <Image source={icons.chatWarn} style={{ width: 60, height: 60 }} />
        }
        title="Before you send a chat request"
        subtitle="Do not disclose your personal details, such as your mobile number, email, or social media profiles, to individuals you do not trust. Biya app will not assume any responsibility in the event of fraud or any adverse occurrences."
      >
        <View style={styles.modalContent}>
          <Button
            title="I understand! let's proceed"
            style={{ backgroundColor: "#0C3BDE", marginTop: 20 }}
            onPress={() => {
              // Handle send request logic here
              modalizeRef.current?.close();
              modalizeRef2.current?.open();
              // You might want to show a confirmation or navigate somewhere
            }}
          />
        </View>
      </CustomModalize>
      <CustomModalize
        ref={modalizeRef2}
        height={350}
        icon={
          <Image source={icons.chatWarn} style={{ width: 60, height: 60 }} />
        }
        title="Chat Request Sent"
        subtitle="Your chat request has been successfully sent. You will receive a response within 24 hours."
      >
        <View style={styles.modalContent}>
          <Button
            title="Close"
            style={{ backgroundColor: "#0C3BDE", marginTop: 20 }}
            onPress={() => modalizeRef2.current?.close()}
          />
        </View>
      </CustomModalize>
    </Container>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailSeparator}>:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: "#0066FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundContainer: {
    flex: 1,
    position: "relative",
    marginTop: 10,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  pImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 30,
  },
  name: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: "#000",
  },
  quickInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  matchImageBackground: {
    width: "100%",
    height: 150,
    justifyContent: "center",
  },
  matchContentOverlay: {
    alignItems: "center",
    justifyContent: "center",
  },
  matchedImage: {
    width: "100%",
    height: 20,
    objectFit: "contain",
  },
  matchNames: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  matchName: {
    fontSize: 18,
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 8,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  matchAmp: {
    fontSize: 36,
    color: "#333",
    marginHorizontal: 10,
  },
  personalDetails: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#FF1493",
    paddingLeft: 10,
  },
  detailsGrid: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  detailSeparator: {
    marginHorizontal: 8,
    color: "#666",
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    gap: 16,
    padding: 16,
    backgroundColor: "#CED8F8",
  },
  modalContent: {
    width: "100%",
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    color: "#555",
    lineHeight: 24,
  },
});

export default ProfileDetails;
