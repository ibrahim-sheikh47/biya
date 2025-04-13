"use client";

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    accountType: null,
    relationship: "",
    profiles: [],
    selectedProfile: null,
  });

  // Load user data from storage on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  // Save user data to storage whenever it changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.log("Error saving user data:", error);
      }
    };

    if (user.accountType) {
      saveUserData();
    }
  }, [user]);

  // Set account type and clear profiles if changing account type
  const setAccountType = (accountType, relationship = "") => {
    setUser((prevUser) => ({
      ...prevUser,
      accountType,
      relationship,
      // Reset profiles if account type changes
      profiles: accountType === prevUser.accountType ? prevUser.profiles : [],
      selectedProfile: null,
    }));
  };

  // Add a profile for guardian or consultant
  const addProfile = (profile) => {
    if (user.accountType !== "guardian" && user.accountType !== "consultant") {
      return;
    }

    setUser((prevUser) => {
      const newProfiles = [
        ...prevUser.profiles,
        {
          id: Date.now().toString(),
          ...profile,
        },
      ];

      return {
        ...prevUser,
        profiles: newProfiles,
        // Set as selected profile if it's the first one
        selectedProfile: prevUser.selectedProfile || newProfiles[0],
      };
    });
  };

  // Select a profile
  const selectProfile = (profileId) => {
    const profile = user.profiles.find((p) => p.id === profileId);
    if (profile) {
      setUser((prevUser) => ({
        ...prevUser,
        selectedProfile: profile,
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setAccountType,
        addProfile,
        selectProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    // Provide a default value when context is undefined
    return {
      user: {
        name: "Guest",
        accountType: null,
        profiles: [],
        selectedProfile: null,
      },
      setUser: () => {},
      setAccountType: () => {},
      addProfile: () => {},
      selectProfile: () => {},
    };
  }
  return context;
};
