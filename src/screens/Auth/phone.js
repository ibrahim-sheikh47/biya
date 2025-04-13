import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import InputField from "../../components/Form/input";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader";

const AddPhoneScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Handle keyboard events to fix button shaking on Android
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleInputChange = (text) => {
    setPhoneNumber(text);
  };

  const handleSendOtp = () => {
    if (phoneNumber.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Verification", { type: "phone" });
      }, 2000);
    }
  };

  return (
    <Container>
      {/* For Android, we use a different approach */}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={64}
        >
          <ContentSection
            phoneNumber={phoneNumber}
            handleInputChange={handleInputChange}
          />
          <ButtonSection
            phoneNumber={phoneNumber}
            handleSendOtp={handleSendOtp}
          />
        </KeyboardAvoidingView>
      ) : (
        // On Android, use a simpler layout structure
        <View style={{ flex: 1 }}>
          <ContentSection
            phoneNumber={phoneNumber}
            handleInputChange={handleInputChange}
          />
          <ButtonSection
            phoneNumber={phoneNumber}
            handleSendOtp={handleSendOtp}
            keyboardVisible={keyboardVisible}
          />
        </View>
      )}

      <Loader isLoading={loading} />
    </Container>
  );
};

// Extracted components to keep the code clean
const ContentSection = ({ phoneNumber, handleInputChange }) => (
  <View style={styles.content}>
    <Text style={styles.title}>Add your mobile Number</Text>
    <InputField
      label={"Enter mobile number"}
      style={{ marginTop: 20 }}
      keyboardType="phone-pad"
      value={phoneNumber}
      onChangeText={handleInputChange}
    />
  </View>
);

const ButtonSection = ({ phoneNumber, handleSendOtp, keyboardVisible }) => (
  <View
    style={[
      styles.buttonContainer,
      Platform.OS === "android" &&
        keyboardVisible &&
        styles.buttonContainerKeyboardVisible,
    ]}
  >
    <Button
      title={"Send OTP"}
      onPress={handleSendOtp}
      style={[
        styles.button,
        phoneNumber.length > 0 ? styles.buttonActive : styles.buttonDisabled,
      ]}
      disabled={phoneNumber.length === 0}
    />
  </View>
);

export default AddPhoneScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 50,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  buttonContainerKeyboardVisible: {
    position: "relative",
    marginTop: 20,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
  },
  buttonActive: {
    backgroundColor: "#0C3BDE", // Active state color
  },
  buttonDisabled: {
    backgroundColor: "#0C3BDE66", // Light blue for disabled state
  },
});
