import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import TabContainer from "../../components/TabContainer";
import Header from "../../components/Header";
import { SortIcon } from "../../../assets/svgs/SortIcon";
import { PaymentProcessIcon } from "../../../assets/svgs/PaymentProcessIcon";
import { ChatIcon } from "../../../assets/svgs/ChatIcon";

export default function NotificationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("All");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const notificationTabs = ["All", "Unread", "Read"];

  const notifications = [
    {
      id: 1,
      title: "Complete your payment process",
      date: "7 February 2024",
      isRead: false,
      icon: <PaymentProcessIcon />,
    },
    {
      id: 2,
      title: "Mominul accepted your chat request",
      date: "7 February 2024",
      isRead: false,
      icon: <ChatIcon />,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSortModal = () => {
    setSortModalVisible(!sortModalVisible);
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !notification.isRead;
    if (activeTab === "Read") return notification.isRead;
    return true;
  });

  const renderNotificationItem = ({ item }) => (
    <View
      key={item.id}
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotificationItem,
      ]}
    >
      <View style={styles.iconContainer}>{item.icon}</View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadIndicator} />}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="notifications-off" size={64} color="#CED8F8" />
      <Text style={styles.emptyText}>No notifications yet</Text>
      <Text style={styles.emptySubText}>
        {activeTab === "All"
          ? "You don't have any notifications at the moment."
          : activeTab === "Unread"
          ? "You don't have any unread notifications."
          : "You don't have any read notifications."}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.row}>
        <Header title={"Notifications"} />
        <TouchableOpacity onPress={toggleSortModal}>
          {sortModalVisible ? (
            <Ionicons name="close" size={24} color="#FF3B8B" />
          ) : (
            <SortIcon />
          )}
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      {sortModalVisible && (
        <View style={styles.sortModalContainer}>
          <View style={styles.sortModal}>
            <TouchableOpacity style={styles.sortOption}>
              <Text style={styles.sortOptionText}>Sort by newest</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.sortOption}>
              <Text style={styles.sortOptionText}>Sort by oldest</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Tab Container */}
      <View style={styles.tabWrapper}>
        <TabContainer
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabs={notificationTabs}
        />
      </View>

      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          filteredNotifications.length === 0 ? { flex: 1 } : null
        }
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 2, // Ensure header stays above the sort modal
  },
  tabWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#FFD5E8",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 15,
    position: "relative",
  },
  iconContainer: {
    width: 34,
    height: 34,
    backgroundColor: "#FFE5F1",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    width: "90%",
    fontFamily: "Poppins-Medium",
    color: "#000",
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: "#888",
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B8B",
    position: "absolute",
    right: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#071F24",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    maxWidth: "80%",
  },
  unreadNotificationItem: {
    backgroundColor: "#FFF5FA", // Light pink background for unread notifications
  },
  sortModalContainer: {
    position: "absolute",
    right: 16,
    top: 50, // Position below the header
    zIndex: 1,
    width: 160,
  },
  sortModal: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sortOptionText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
  },
});
