import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import images from "../../constants/images";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <Container pd={0}>
      <StatusBar style="auto" backgroundColor={colors.primary} />

      {/* Header Image Section */}
      <View style={styles.imageContainer}>
        <Image source={images.obImg} style={styles.headerImage} />
        <Image source={images.helper1} style={styles.helperLeft} />
        <Image source={images.biya} style={styles.logo} />
        <Image source={images.helper2} style={styles.helperRight} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Image source={images.bismillahImg} style={styles.bismillahImage} />

        <Text style={styles.mainText}>
          A Marriage App for Bengali Muslims Living in UK Bengali Muslim British
          Citizens of UK
        </Text>

        <Text style={styles.subText}>
          Search Muslim British Graduates or Multi-Skilled Professional Brides &
          Grooms.
        </Text>
      </View>

      {/* CTA Button */}
      <Button
        title="Find your Soulmate"
        style={styles.button}
        onPress={() => {
          navigation.navigate("Auth");
        }}
      />
    </Container>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  helperLeft: {
    width: 150,
    height: 127,
    position: "absolute",
    left: 0,
    bottom: -25,
  },
  helperRight: {
    width: 150,
    height: 127,
    position: "absolute",
    right: 0,
    bottom: -25,
  },
  logo: {
    width: 135,
    height: 74,
    position: "absolute",
    left: "35%",
    bottom: -40,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  bismillahImage: {
    width: 200,
    height: 61,
  },
  mainText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    marginTop: 40,
  },
  subText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 40,
    marginHorizontal: 50,
    color: "#8E8E8E",
  },
  button: {
    marginBottom: 40,
    width: "90%",
    alignSelf: "center",
  },
});
