import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
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

        <Button
          title={"Send OTP"}
          onPress={handleSendOtp}
          style={[
            styles.button,
            phoneNumber.length > 0
              ? styles.buttonActive
              : styles.buttonDisabled,
          ]}
          disabled={phoneNumber.length === 0}
        />
      </KeyboardAvoidingView>

      <Loader isLoading={loading} />
    </Container>
  );
};

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
