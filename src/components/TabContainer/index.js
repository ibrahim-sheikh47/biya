import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import colors from "../../constants/colors";

const TabContainer = ({ activeTab, onTabClick, tabs }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => onTabClick(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && { color: colors.secondary }, // Change text color for active tab
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#CED8F8",
    borderRadius: 100,
    paddingHorizontal: 4,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5, // Add some padding for better spacing
  },
  tabButton: {
    borderRadius: 30,
    height: 45,
    minWidth: 110, // Minimum width to ensure buttons are not too small
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10, // Space between tabs
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
