import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import Header from "../../components/Header";
import InputField from "../../components/Form/input";
import Button from "../../components/Button/Button";

const ProfileForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { section } = route.params;

  const [formValues, setFormValues] = useState(
    section.fields.reduce((acc, field) => {
      acc[field.label] = "";
      return acc;
    }, {})
  );

  const handleInputChange = (fieldLabel, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldLabel]: value,
    }));
  };

  const handleSubmit = () => {
    const totalFields = section.fields.length;
    const filledFields = Object.values(formValues).filter(
      (value) => value !== ""
    ).length;
    const completionPercentage = Math.round((filledFields / totalFields) * 100);

    navigation.navigate("CreateProfile", {
      sectionId: section.id,
      completionPercentage,
    });
  };

  return (
    <Container pd={16}>
      <Header title={section.title} />
      {Platform.OS === "ios" ? (
        // iOS layout with KeyboardAvoidingView
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={50}
        >
          <FormContent
            section={section}
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
          <View style={styles.buttonContainer}>
            <Button title={"Save"} onPress={handleSubmit} />
          </View>
        </KeyboardAvoidingView>
      ) : (
        // Android layout without KeyboardAvoidingView
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FormContent
              section={section}
              formValues={formValues}
              handleInputChange={handleInputChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={"Save"} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Container>
  );
};

// Extracted FormContent component
const FormContent = ({ section, formValues, handleInputChange }) => (
  <FlatList
    ListHeaderComponent={() => (
      <View style={styles.info}>
        <Text>
          Fill details as accurately as possible for the best possible Automatic
          AI Match for a life partner.
        </Text>
      </View>
    )}
    contentContainerStyle={styles.listContent}
    data={section.fields}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.inputContainer}>
        <InputField
          label={item.label}
          type={item.type}
          options={item.options || []}
          value={formValues[item.label]}
          onChangeText={(value) => handleInputChange(item.label, value)}
        />
      </View>
    )}
    ListFooterComponent={() => (
      <>
        {section.id === 6 && (
          <View style={[styles.info, { marginTop: 30, marginBottom: 80 }]}>
            <Text style={{ lineHeight: 20 }}>
              Please do not disclose your mobile number, Email or social media
              accounts. It is against Biya app T&C. Incase of violation, we may
              block you from Biya.
            </Text>
          </View>
        )}
        {/* Add extra padding at the bottom for Android */}
        {Platform.OS === "android" && <View style={{ height: 20 }} />}
      </>
    )}
  />
);

const styles = StyleSheet.create({
  listContent: {
    marginTop: 20,
    paddingBottom: Platform.OS === "android" ? 20 : 0,
  },
  info: {
    backgroundColor: "#FFDDED",
    borderColor: "#FFB0D5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  warningText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default ProfileForm;
