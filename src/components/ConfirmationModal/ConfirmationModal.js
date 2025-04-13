// components/ConfirmationModal.js
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../constants/colors";
import icons from "../../constants/icons";

const ConfirmationModal = ({ visible, onCancel, onConfirm, personName }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.emojiContainer}>
            <Image source={icons.happyEmoji} style={styles.emojiImage} />
          </View>

          <Text style={styles.title}>Hold on!</Text>

          <Text style={styles.message}>
            Are you sure you want to remove this person from favourite list?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#B5C1FB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emojiImage: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E6EAFF",
    borderColor: "#0049FF",
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: colors.blue,
  },
  cancelButtonText: {
    color: "#0049FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ConfirmationModal;
