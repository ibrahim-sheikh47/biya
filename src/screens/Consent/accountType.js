"use client";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import { useState } from "react";
import Container from "../../components/Container";
import { RadioButton, TextInput } from "react-native-paper";
import colors from "../../constants/colors";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/Form/input";
import { BrideIcon } from "../../../assets/svgs/BrideIcon";
import { GroomIcon } from "../../../assets/svgs/GroomIcon";
import { GuardianIcon } from "../../../assets/svgs/GuardianIcon";
import { ConsultantIcon } from "../../../assets/svgs/ConsultantIcon";
import { useUser } from "../../context/UserContext";

const AccountTypeScreen = () => {
  const navigation = useNavigation();
  const { setAccountType } = useUser();
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [relationship, setRelationship] = useState("");

  const options = [
    { id: 1, label: "Bride", value: "bride", image: <BrideIcon /> },
    { id: 2, label: "Groom", value: "groom", image: <GroomIcon /> },
    { id: 3, label: "Guardian", value: "guardian", image: <GuardianIcon /> },
    {
      id: 4,
      label: "Marriage Consultant",
      value: "consultant",
      image: <ConsultantIcon />,
    },
  ];

  const relationshipOptions = [
    "Father / Mother",
    "Grand parent",
    "Foster Parent",
    "Brother / Sister / Cousin",
    "Uncle / Aunt",
  ];

  const handleContinue = () => {
    const selectedType = options.find((option) => option.id === selectedOption);

    if (selectedType) {
      // Save the account type to context
      setAccountType(
        selectedType.value,
        selectedType.value === "guardian" ? relationship : ""
      );

      // For debugging
      console.log("Setting account type:", selectedType.value);

      // Show alert for guardian/consultant to confirm the dropdown will appear
      if (
        selectedType.value === "guardian" ||
        selectedType.value === "consultant"
      ) {
        Alert.alert(
          "Account Type Set",
          `You've selected ${selectedType.label}. You'll now be able to manage multiple profiles.`,
          [{ text: "OK", onPress: () => navigation.navigate("CreateProfile") }]
        );
      } else {
        navigation.navigate("CreateProfile");
      }
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Account Type</Text>
        <Text style={styles.subText}>Select one account type below</Text>

        <RadioButton.Group
          onValueChange={(newValue) => setSelectedOption(newValue)}
          value={selectedOption}
        >
          <View style={styles.gridContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionContainer,
                  selectedOption === option.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={styles.optionHeader}>
                  <View style={styles.flagContainer}>{option.image}</View>
                  <RadioButton.Android
                    value={option.id}
                    color={colors.secondary}
                    uncheckedColor="#B8B8B8"
                  />
                </View>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RadioButton.Group>

        {/* Show Relationship Input if Guardian is Selected */}
        {selectedOption === 3 && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <InputField
              label="Relationship with Bride/Groom"
              value={relationship}
              mode="outlined"
              placeholder="Select Relationship"
              editable={false}
              right={<TextInput.Icon icon="chevron-down" />}
              style={styles.input}
            />
          </TouchableOpacity>
        )}
      </ScrollView>

      <Button
        title="Continue"
        disabled={!selectedOption || (selectedOption === 3 && !relationship)}
        style={[
          styles.button,
          selectedOption && (selectedOption !== 3 || relationship)
            ? styles.buttonActive
            : styles.buttonDisabled,
        ]}
        onPress={handleContinue}
      />

      {/* Modal for Selecting Relationship */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Relationship</Text>
            {relationshipOptions.map((rel, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setRelationship(rel);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{rel}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default AccountTypeScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 50,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#3F3F3F",
    lineHeight: 24,
    marginBottom: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionContainer: {
    width: "48%",
    height: 135,
    borderWidth: 2,
    borderColor: "#DADADA",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
  selectedOption: {
    borderColor: colors.secondary,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  flagContainer: {
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEDF5",
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#3F3F3F",
  },
  input: {
    marginTop: 20,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: "#0C3BDE66",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 16,
  },
});
