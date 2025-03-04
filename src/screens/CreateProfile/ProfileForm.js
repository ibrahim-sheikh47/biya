import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.info}>
              <Text>
                Fill details as accurately as possible for the best possible
                Automatic AI Match for a life partner.
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          data={section.fields}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
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
                <View style={[styles.info, { marginTop: 30 }]}>
                  <Text style={{ lineHeight: 20 }}>
                    Please do not disclose your mobile number, Email or social
                    media accounts. It is against Biya app T&C. Incase of
                    violation, we may block you from Biya.
                  </Text>
                </View>
              )}
            </>
          )}
        />

        <Button
          title={"Save"}
          onPress={handleSubmit}
          style={{ marginVertical: 20 }}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: { marginTop: 20 },
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
});

export default ProfileForm;
