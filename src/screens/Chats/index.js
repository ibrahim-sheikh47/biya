"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState("Accepted");
  const navigation = useNavigation();

  const tabs = ["Accepted", "Pending", "Rejected"];

  const chatData = [
    {
      id: "1",
      name: "Aysha Khatun",
      message: "Nice to meet you.",
      time: "5:40PM",
      isOnline: true,
      unreadCount: 1,
    },
    {
      id: "2",
      name: "Miss Fatima",
      message: "Sticker",
      time: "5:40PM",
      isOnline: false,
      unreadCount: 0,
      isSticker: true,
    },
    {
      id: "3",
      name: "Firoza Khan",
      message: "Let's meet tomorrow",
      time: "5:40PM",
      isOnline: false,
      unreadCount: 0,
    },
  ];

  const handleChatPress = (item) => {
    navigation.navigate("ChatDetailScreen", { chatItem: item });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <View style={styles.chatContent}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.messageContainer}>
          {item.isSticker ? (
            <View style={styles.stickerContainer}>
              <Feather name="smile" size={16} color="#666" />
              <Text style={styles.messageText}>Sticker</Text>
            </View>
          ) : (
            <Text style={styles.messageText}>{item.message}</Text>
          )}
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chats</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit" size={22} color="#0066ff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab ? styles.activeTab : null]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : null,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        style={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  editButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#e8eaf6",
    borderRadius: 25,
    marginBottom: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  chatContent: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 5,
  },
  onlineIndicator: {
    width: 12,
    marginLeft: 10,
    height: 12,
    borderRadius: 10,
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  timeContainer: {
    alignItems: "flex-end",
    height: "100%",
  },
  timeText: {
    fontSize: 12,
    color: "#F50073",
  },
  unreadBadge: {
    backgroundColor: "#F50073",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 20,
  },
});
