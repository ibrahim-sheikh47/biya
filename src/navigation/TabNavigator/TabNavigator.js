import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../../constants/colors";
import LiveScreen from "../../screens/Live/LiveScreen";
import FavoritesScreen from "../../screens/Favourites";

// Import both filled and unfilled icons
import { Tab1Icon } from "../../../assets/svgs/Tab1Icon";
import { Tab2Icon } from "../../../assets/svgs/Tab2Icon";
import { Tab3Icon } from "../../../assets/svgs/Tab3Icon";
import { Tab1IconFilled } from "../../../assets/svgs/Tab1IconFilled";
import { Tab2IconFilled } from "../../../assets/svgs/Tab2IconFilled";
import { Tab3IconFilled } from "../../../assets/svgs/Tab3IconFilled";
import ChatsScreen from "../../screens/Chats";

// Create the tab navigator
const Tab = createBottomTabNavigator();

// Sample screen components

// Custom tab bar icon component
const CustomTabBarIcon = ({ focused, FilledIcon, UnfilledIcon, isSpecial }) => {
  const IconComponent = focused ? FilledIcon : UnfilledIcon;

  if (isSpecial && focused) {
    return (
      <View
        style={{
          backgroundColor: colors.blue,
          borderRadius: 50,
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconComponent fill="#FFFFFF" />
      </View>
    );
  }

  return <IconComponent fill={focused ? "#0066CC" : "#7C7C7C"} />;
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Live"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#CED8F8",
          height: 90,
          paddingBottom: 15,
          paddingTop: 15,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 7,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              FilledIcon={Tab1IconFilled}
              UnfilledIcon={Tab1Icon}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 12,
                fontWeight: focused ? "bold" : "normal",
                fontFamily: "Poppins-Medium",
                color: focused ? colors.secondary : "#0C3BDEB2",
                marginTop: 3,
              }}
            >
              Chats
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              FilledIcon={Tab2IconFilled}
              UnfilledIcon={Tab2Icon}
              isSpecial={true} // Mark this tab as special
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 12,
                fontWeight: focused ? "bold" : "normal",
                fontFamily: "Poppins-Medium",
                color: focused ? colors.secondary : "#0C3BDEB2",
                marginTop: 3,
              }}
            >
              Live
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              FilledIcon={Tab3IconFilled}
              UnfilledIcon={Tab3Icon}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 12,
                fontWeight: focused ? "bold" : "normal",
                fontFamily: "Poppins-Medium",
                color: focused ? colors.secondary : "#0C3BDEB2",
                marginTop: 3,
              }}
            >
              Favourites
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({});
