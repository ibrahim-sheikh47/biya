import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const Loader = ({ isLoading }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.loader,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Less opacity background
    zIndex: 1000,
  },
  loaderContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // White background for the loader itself
    borderRadius: 100,
    elevation: 5, // Small shadow for better visibility
  },
  loader: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: colors.secondary,
    borderTopColor: "transparent",
    borderRadius: 20,
  },
});

export default Loader;
