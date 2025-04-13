import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";

const AboutUs = () => {
  return (
    <Container>
      <Header title={"About Us"} />
      <Text style={{ marginTop: 20, marginHorizontal: 20, lineHeight: 28 }}>
        Biya was envisioned on the basis of several important factors. Halal way
        of dating in our Bengali Muslim Community keeping modesty and honour in
        family while taking positive aspects from our traditional marriage
        negotiation techniques. Hence the Chat and Voice functions therefore
        should be used in this traditional manner and no photos or videos are
        allowed keeping the Biya App Halal. Once both parties come to terms the
        idea is to meet each other in person or then exchange media directly
        without using Biya.
      </Text>
    </Container>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
