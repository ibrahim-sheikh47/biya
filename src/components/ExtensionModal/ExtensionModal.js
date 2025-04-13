import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

const ExtensionModal = ({
  modalizeRef,
  negotiationTimeMinutes,
  extensionHours,
  incrementExtensionHours,
  decrementExtensionHours,
  handleExtendTime,
}) => {
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      modalStyle={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiIcon}>😊</Text>
        </View>

        <Text style={styles.modalTitle}>Heads up</Text>

        <Text style={styles.modalDescription}>
          You have only {negotiationTimeMinutes}{" "}
          {negotiationTimeMinutes === 1 ? "minute" : "minutes"} negotiation time
          left. Please extend your negotiation time to continue.
        </Text>

        <View style={styles.extensionOption}>
          <Text style={styles.extensionText}>
            Extend {extensionHours} hour chat time for £{extensionHours * 5}
          </Text>

          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={decrementExtensionHours}
            >
              <Text style={styles.counterButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>{extensionHours}</Text>

            <TouchableOpacity
              style={styles.counterButton}
              onPress={incrementExtensionHours}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modalActions}>
          <TouchableOpacity
            style={styles.notNowButton}
            onPress={() => modalizeRef.current?.close()}
          >
            <Text style={styles.notNowText}>Not now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalExtendButton}
            onPress={handleExtendTime}
          >
            <Text style={styles.modalExtendText}>Extend time</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.referralLink}>
          <Text style={styles.referralText}>
            Use referral gifts for chat extension →
          </Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#B0C4DE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  emojiIcon: {
    fontSize: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  extensionOption: {
    backgroundColor: "#FFE4E1",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  extensionText: {
    color: "#F50073",
    fontWeight: "600",
    flex: 1,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    color: "#F50073",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  notNowButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
  },
  notNowText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  modalExtendButton: {
    flex: 1,
    backgroundColor: "#0C3BDE",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 10,
  },
  modalExtendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  referralLink: {
    marginTop: 5,
  },
  referralText: {
    color: "#0C3BDE",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ExtensionModal;
