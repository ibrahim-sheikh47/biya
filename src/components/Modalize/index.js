import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

const CustomModalize = React.forwardRef(
  ({ icon, title, subtitle, children, height }, ref) => {
    return (
      <Modalize ref={ref} modalHeight={height}>
        <View style={styles.container}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.content}>{children}</View>
        </View>
      </Modalize>
    );
  }
);

export default CustomModalize;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    color: "gray",
    marginBottom: 15,
  },
  content: {
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
});
