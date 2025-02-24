import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../../constants/colors";

const Button = ({
  onPress,
  title,
  style,
  textStyle,
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, { opacity: disabled || loading ? 0.5 : 1 }]}
      disabled={disabled}
    >
      {loading && <ActivityIndicator size="small" color={"#fff"} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    borderWidth: 1, // Default border width
    borderColor: "transparent", // Default border color
    gap: 5,
    backgroundColor: colors.secondary,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
});

export default Button;
