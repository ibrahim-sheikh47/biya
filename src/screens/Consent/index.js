import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import Button from "../../components/Button/Button";
import images from "../../constants/images";
import colors from "../../constants/colors";
import CustomModalize from "../../components/Modalize";
import { CongratsIcon } from "../../../assets/svgs/CongratsIcon";
import { UkIcon } from "../../../assets/svgs/UkIcon";
import { BritishIcon } from "../../../assets/svgs/BritishIcon";

const ConsentScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, []);

  const options = [
    {
      id: 1,
      label: "I am a Muslim Bengali British Citizen",
      image: <BritishIcon />,
    },
    {
      id: 2,
      label: "I am a Muslim Bengali living in the UK",
      image: <UkIcon />,
    },
  ];

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>We need your consent</Text>
        <Text style={styles.subText}>
          Biya uses advanced AI-based matchmaking based on your profile details
          and preferences. Choose one option below to proceed.
        </Text>

        <RadioButton.Group
          onValueChange={(newValue) => setSelectedOption(newValue)}
          value={selectedOption}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionContainer,
                selectedOption === option.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption(option.id)}
            >
              <View style={styles.flagContainer}>{option.image}</View>
              <Text style={styles.optionText}>{option.label}</Text>
              <RadioButton.Android
                value={option.id}
                color={colors.secondary}
                uncheckedColor="#B8B8B8"
              />
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
      </ScrollView>
      <Button
        title="Continue"
        disabled={!selectedOption}
        style={[
          styles.button,
          selectedOption ? styles.buttonActive : styles.buttonDisabled,
        ]}
        onPress={() => navigation.navigate("AccountType")}
      />
      <CustomModalize
        height={330}
        ref={modalRef}
        icon={<CongratsIcon />}
        title="Congratulations!"
        subtitle="Your Biya account has been created. You are one step closer to finding your perfect soulmate."
      >
        <Button title={"Continue"} onPress={modalRef.current?.close} />
      </CustomModalize>
    </Container>
  );
};
export default ConsentScreen;

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
  subText: {
    fontSize: 14,
    color: "#3F3F3F",
    lineHeight: 24,
    marginBottom: 50,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
    borderColor: "#DADADA",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
  },
  selectedOption: {
    borderColor: colors.secondary,
  },
  flagContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEDF5",
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#3F3F3F",
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: "#0C3BDE66",
  },
});
