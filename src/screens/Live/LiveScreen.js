// screens/LiveScreen/LiveScreen.js
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../constants/colors";
import ProfileCard from "../../components/ProfileCard";
import CustomModalize from "../../components/Modalize";
import { CongratsIcon } from "../../../assets/svgs/CongratsIcon";
import Button from "../../components/Button/Button";
import icons from "../../constants/icons";
import { RateUsModal } from "../../components/RateUsModal/RateUsModal";

export default function LiveScreen() {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Bride");
  const navigation = useNavigation();
  const [hasShownWelcomeModal, setHasShownWelcomeModal] = useState(false);
  const [profiles, setProfiles] = useState([
    {
      id: "1",
      name: "Aysha Khatun",
      location: "Liverpool",
      profession: "Lawyer",
      isOnline: true,
      isNew: true,
      age: 25,
      skinColor: "Reddish Fair",
      nationality: "British",
      bornIn: "UK",
      height: "5'6\"",
      appearance: "Elegant",
      fatherName: "Mr. Khatun",
      motherName: "Mrs. Khatun",
    },
    {
      id: "2",
      name: "Miss Fatima",
      location: "Leicester",
      profession: "Doctor",
      isOnline: false,
      isNew: false,
      age: 20,
      skinColor: "Reddish Fair",
      nationality: "British",
      bornIn: "UK",
      height: "5'4\"",
      appearance: "Charming",
      fatherName: "Mr. Abdul",
      motherName: "Mrs. Abdul",
    },
    {
      id: "3",
      name: "Firoza Khan",
      location: "Birmingham",
      profession: "Business",
      isOnline: true,
      isNew: false,
      age: 22,
      skinColor: "Fair",
      nationality: "British",
      bornIn: "UK",
      height: "5'5\"",
      appearance: "Stylish",
      fatherName: "Mr. Khan",
      motherName: "Mrs. Khan",
    },
    {
      id: "4",
      name: "Gulshan",
      location: "London",
      profession: "Teacher",
      isOnline: false,
      isNew: false,
      age: 23,
      skinColor: "Dark",
      nationality: "British",
      bornIn: "UK",
      height: "5'3\"",
      appearance: "Graceful",
      fatherName: "Mr. Hamza",
      motherName: "Mrs. Hamza",
    },
  ]);

  const welcomeModalRef = useRef(null);
  const paymentSuccessModalRef = useRef(null);

  // Check if welcome modal has been shown before
  const checkWelcomeModalStatus = async () => {
    try {
      const hasShown = await AsyncStorage.getItem("hasShownWelcomeModal");
      return hasShown === "true";
    } catch (error) {
      console.error("Error checking welcome modal status:", error);
      return false;
    }
  };

  // Mark welcome modal as shown
  const markWelcomeModalAsShown = async () => {
    try {
      await AsyncStorage.setItem("hasShownWelcomeModal", "true");
      setHasShownWelcomeModal(true);
    } catch (error) {
      console.error("Error saving welcome modal status:", error);
    }
  };

  useEffect(() => {
    // Check if welcome modal has been shown before
    const checkAndShowWelcomeModal = async () => {
      const hasShown = await checkWelcomeModalStatus();

      if (!hasShown) {
        // Only show welcome modal if it hasn't been shown before
        if (welcomeModalRef.current) {
          welcomeModalRef.current.open();
        }
      } else {
        setHasShownWelcomeModal(true);
      }
    };

    checkAndShowWelcomeModal();
  }, []);

  const handlePaymentSuccess = () => {
    // Close payment success modal
    if (paymentSuccessModalRef.current) {
      paymentSuccessModalRef.current.close();
    }
  };

  // Navigate to payment screen on any interaction
  const handleAnyInteraction = () => {
    navigation.navigate("PaymentScreen", {
      onPaymentSuccess: () => {
        // This will be called from the payment screen on successful payment
        if (paymentSuccessModalRef.current) {
          paymentSuccessModalRef.current.open();
        }
      },
    });
  };

  const handleCloseWelcomeModal = () => {
    welcomeModalRef.current?.close();
    markWelcomeModalAsShown();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handleAnyInteraction}>
      <ProfileCard
        name={item.name}
        location={item.location}
        profession={item.profession}
        isOnline={item.isOnline}
        isNew={item.isNew}
        age={item.age}
        skinColor={item.skinColor}
        nationality={item.nationality}
        bornIn={item.bornIn}
        height={item.height}
        appearance={item.appearance}
        fatherName={item.fatherName}
        motherName={item.motherName}
      />
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="search-off" size={60} color={colors.gray} />
      <Text style={styles.emptyTitle}>No profiles found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search criteria or check back later for new profiles
      </Text>
    </View>
  );

  const [modalVisible, setModalVisible] = useState(true);

    const closeModal = () => {
      setModalVisible(false);
    };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={handleAnyInteraction}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Name, Area, City, Profession"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
              onFocus={handleAnyInteraction}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleAnyInteraction}
            >
              <Ionicons name="search" size={24} color={colors.secondary} />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Date Search and Filters */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.dateSearchButton}
              onPress={handleAnyInteraction}
            >
              <Text style={styles.dateSearchText}>Search by date</Text>
              <MaterialIcons
                name="date-range"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === "Bride" && styles.activeTabButton,
                ]}
                onPress={() => {
                  handleAnyInteraction();
                  setActiveTab("Bride");
                }}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === "Bride" && styles.activeTabText,
                  ]}
                >
                  Bride
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === "Groom" && styles.activeTabButton,
                ]}
                onPress={() => {
                  handleAnyInteraction();
                  setActiveTab("Groom");
                }}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === "Groom" && styles.activeTabText,
                  ]}
                >
                  Groom
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Profile List */}
        <FlatList
          style={styles.profileList}
          data={profiles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyListComponent}
          contentContainerStyle={[
            profiles.length === 0 ? { flex: 1 } : null,
            styles.listContentContainer,
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Welcome Modal */}
      <CustomModalize
        height={330}
        ref={welcomeModalRef}
        icon={<CongratsIcon />}
        title="Congratulations!"
        subtitle="Your Biya profile is set. You are one step closer to finding your perfect soulmate."
      >
        <Button title={"Continue"} onPress={handleCloseWelcomeModal} />
      </CustomModalize>

      {/* Payment Success Modal */}
      <CustomModalize
        height={330}
        ref={paymentSuccessModalRef}
        icon={icons.paymentSuccessful}
        title="Payment Success"
        subtitle="Your payment towards Biya subscription was successful. Good luck finding your soulmate"
      >
        <Button title={"Continue"} onPress={handlePaymentSuccess} />
      </CustomModalize>
            <RateUsModal isVisible={modalVisible} onClose={closeModal} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContent: {
    backgroundColor: "#CED8F8",
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  searchContainer: {
    backgroundColor: colors.lightBlue,
    padding: 15,
    borderRadius: 28,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchInput: {
    height: 50,
    fontSize: 14,
    color: colors.black,
    width: "90%",
  },
  searchButton: {
    padding: 8,
    marginLeft: "auto",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateSearchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
  },
  dateSearchText: {
    fontSize: 16,
    color: colors.gray,
    marginRight: 10,
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabButton: {
    backgroundColor: colors.secondary,
  },
  tabButtonText: {
    fontSize: 16,
    color: colors.gray,
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  profileList: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  listContentContainer: {
    paddingBottom: Platform.OS === "android" ? 80 : 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray,
    marginTop: 10,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
    maxWidth: "80%",
  },
});
