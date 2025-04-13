import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";

const CommunityProb = () => {
  const problems = [
    "Fear of (Halal) Dating due to lack of knowledge.",
    "Fear of Society in (Halal) Dating.",
    "Fear or Anxiety about Marriage.",
    "Too shy to talk about Marriage.",
    "No time to search traditionally for marriage.",
    "Limited choice due to small family circle.",
    "Limited choice due to having only few contacts.",
    "Reduced opportunities due to limited information at hand (for matching the right Bride & Groom Qualities and Values).",
  ];
  return (
    <Container>
      <Header title={"Community Problems"} />

      <Text style={styles.description}>
        This App identifies and addresses the following in our Muslim Bengali
        Community in the UK:
      </Text>

      {problems.map((item, index) => (
        <Text key={index} style={styles.listItem}>
          • {item}
        </Text>
      ))}
    </Container>
  );
};

export default CommunityProb;

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginBottom: 10,
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  listItem: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
});
