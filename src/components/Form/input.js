import React, { useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Text, Divider } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  mode = "outlined",
  secureTextEntry = false,
  keyboardType = "default",
  style,
  textColor = "black",
  outlineColor = "gray",
  activeOutlineColor = "blue",
  roundness = 20,
  type,
  options = [],
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Handle option selection
  const handleOptionSelect = (option) => {
    onChangeText(option);
    setModalVisible(false);
  };

  // If this is a dropdown type input
  if (type === "dropdown" && options.length > 0) {
    return (
      <View style={styles.container}>
        {/* Use TextInput for consistent appearance but make it non-editable */}
        <TextInput
          mode={mode}
          label={label}
          placeholder={"Select here"}
          value={value}
          editable={false} // Make the input non-editable
          style={[styles.textInput, style]}
          textColor={textColor}
          outlineColor={outlineColor}
          activeOutlineColor={activeOutlineColor}
          theme={{ roundness }}
          right={
            <TextInput.Icon
              icon={() => (
                <AntDesign
                  onPress={() => setModalVisible(true)}
                  name={modalVisible ? "caretup" : "caretdown"}
                  size={20}
                  color="blue"
                />
              )}
            />
          }
          {...props}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.optionsContainer}>
                <Ionicons
                  name="close"
                  size={30}
                  onPress={() => setModalVisible(false)}
                  color="black"
                  style={{ position: "absolute", right: -10, top: -10 }}
                />
                <View style={{ marginTop: 10 }}>
                  {options.map((option, index) => (
                    <>
                      <TouchableOpacity
                        key={index}
                        style={styles.optionItem}
                        onPress={() => handleOptionSelect(option)}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                      {index !== options.length - 1 && <Divider />}
                    </>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // For regular text inputs
  return (
    <View style={styles.container}>
      <TextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.textInput, style]}
        textColor={textColor}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        theme={{ roundness }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  textInput: {
    backgroundColor: "#fff",
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
    marginBottom: 20,
    textAlign: "center",
  },
  optionItem: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4169E1",
  },
});

export default InputField;
