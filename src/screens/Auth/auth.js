import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import images from "../../constants/images";
import InputField from "../../components/Form/input";
import colors from "../../constants/colors";
import Button from "../../components/Button/Button";
import GoogleLogo from "../../../assets/svgs/GoogleLogo";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  // State Management
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  // Check if email is entered
  const isButtonDisabled = email.trim() === "";

  return (
    <Container pd={0}>
      {/* Keyboard Avoiding View for smooth interaction */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={images.img1} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.heading}>Let’s Sign in/Sign up</Text>

            <View style={{ gap: 30 }}>
              {/* Input Field */}
              <InputField
                label="Enter Email ID"
                placeholder="Eg: Ibrahim@gmail.com"
                value={email}
                onChangeText={setEmail}
                outlineColor="#C7C7C7"
                activeOutlineColor="blue"
                textColor="black"
                roundness={20}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              {/* Send Verification Button (Disabled if no email) */}
              <Button
                title={"Send Verification Code"}
                disabled={isButtonDisabled}
                style={isButtonDisabled ? styles.disabledButton : {}}
                onPress={() => {
                  navigation.navigate("Verification", { type: "email" });
                }}
              />

              <Text style={styles.orText}>or</Text>

              {/* Google Sign-in Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("AccountType");
                }}
              >
                <GoogleLogo />
                <Text style={styles.text}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 227,
    resizeMode: "cover",
  },
  content: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    marginVertical: 20,
    fontFamily: "Poppins-Medium",
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.secondary,
    borderWidth: 1,
    gap: 10,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: colors.secondary,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  disabledButton: {
    backgroundColor: "#0C3BDE66",
  },
});
