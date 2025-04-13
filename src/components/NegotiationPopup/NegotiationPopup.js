import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const NegotiationPopup = ({
  negotiationTimeMinutes,
  onClose,
  onExtendPress,
}) => {
  return (
    <View style={styles.negotiationPopup}>
      <View style={styles.negotiationContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.clockIcon}>
          <Feather name="clock" size={40} color="#FF0080" />
        </View>

        <Text style={styles.negotiationTitle}>Negotiation time left</Text>

        <Text style={styles.negotiationTime}>
          {negotiationTimeMinutes}{" "}
          {negotiationTimeMinutes === 1 ? "Minute" : "Minutes"}
        </Text>

        <TouchableOpacity style={styles.extendButton} onPress={onExtendPress}>
          <Text style={styles.extendButtonText}>Extend time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  negotiationPopup: {
    position: "absolute",
    bottom: 120,
    right: 30,
    zIndex: 1000,
  },
  negotiationContent: {
    backgroundColor: "#FFF0F5",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -15,
    backgroundColor: "#0C3BDE",
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  clockIcon: {
    marginBottom: 10,
  },
  negotiationTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  negotiationTime: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  extendButton: {
    borderWidth: 2,
    borderColor: "#0C3BDE",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  extendButtonText: {
    color: "#0C3BDE",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default NegotiationPopup;
