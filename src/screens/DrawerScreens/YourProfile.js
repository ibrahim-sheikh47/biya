import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have expo vector icons installed
import InputField from "../../components/Form/input";
import Button from "../../components/Button/Button";

const YourProfile = () => {
  return (
    <Container>
      <Header title={"Your Profile"} />
      <ScrollView style={styles.scrollView}>
        {/* Discount Banner */}
        <View style={styles.info}>
          <Text>
            Please note: You must add Bride or Groom, who are Bengali Muslims
            Living in UK or Bengali Muslim British Citizens of UK on Biya App.
            No refund will be issued if you fail to do so and your account will
            be suspended and consequently removed.
          </Text>
        </View>
        <View style={styles.discountBanner}>
          <View style={styles.discountIconContainer}>
            <Ionicons name="gift-outline" size={20} color="#00A67E" />
          </View>
          <Text style={styles.discountText}>
            Get 60% discount from 5th bride/groom addition onwards.
          </Text>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLine} />

            {[1, 2, 3, 4, 5].map((step) => (
              <View key={step} style={styles.stepContainer}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <InputField label={"Full name"} />
          </View>

          {/* Business Email */}
          <View style={styles.inputGroup}>
            <InputField label={"Business email"} />
          </View>

          {/* Mobile Number */}
          <View style={styles.inputGroup}>
            <InputField label={"Mobile number"} />
          </View>

          {/* Business Registration Number */}
          <View style={styles.inputGroup}>
            <InputField label={"Business Registration Number"} />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <Button
        title={"Save"}
        style={{ width: "90%", marginHorizontal: "auto", marginVertical: 20 }}
      />
    </Container>
  );
};

export default YourProfile;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  info: {
    backgroundColor: "#FFDDED",
    borderColor: "#FFB0D5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  discountBanner: {
    backgroundColor: "#E0FFF0",
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    borderColor: "#6EE7B7",
    borderWidth: 1,
  },
  discountIconContainer: {
    backgroundColor: "#FFFFFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  discountText: {
    color: "#00A67E",
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Poppins-Semibold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    height: 30,
  },
  progressLine: {
    position: "absolute",
    height: 2,
    backgroundColor: "#CCCCCC",
    left: 0,
    right: 0,
    top: 15,
  },
  stepContainer: {
    alignItems: "center",
    zIndex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 12,
    color: "#666666",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});
