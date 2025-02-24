import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import images from "../../constants/images";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding"); // Navigates to Login screen
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Image source={images.splashImg} style={styles.image} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
