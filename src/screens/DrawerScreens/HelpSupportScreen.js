import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.faqQuestion}>{question}</Text>
        <View style={styles.plusIconContainer}>
          <Feather
            name={expanded ? "minus" : "plus"}
            size={18}
            color="#FF1493"
          />
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqAnswerContainer}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const HelpSupportScreen = () => {
  const [message, setMessage] = useState("");

  const faqData = [
    {
      id: 1,
      question: "How does Biya app work?",
      answer:
        "Biya is a Muslim marriage app that connects individuals seeking marriage. Create a profile, browse potential matches, and connect with those who share your values and interests. Our platform prioritizes privacy and Islamic values throughout the matchmaking process.",
    },
    {
      id: 2,
      question:
        "Is the use of a Muslim marriage app compatible with Islamic teachings?",
      answer:
        "Yes, Biya is designed with Islamic principles in mind. We provide a halal way to find a spouse by maintaining appropriate boundaries, involving family members when needed, and focusing on marriage rather than casual relationships. Many scholars approve of such platforms when used with proper intention and adherence to Islamic guidelines.",
    },
    {
      id: 3,
      question: "Are Profiles on Biya verified?",
      answer:
        "Yes, we have a verification process to ensure authenticity. Users can verify their profiles through document checks, phone verification, and optional references. We encourage users to look for the verification badge when browsing profiles.",
    },
    {
      id: 4,
      question: "Can I use Biya outside the UK?",
      answer:
        "Yes, Biya is available internationally. While our primary user base is in the UK, we have members from various countries. You can set your location preferences to find matches in specific regions or countries.",
    },
    {
      id: 5,
      question:
        "Are Guardian or Parents involved in the matchmaking process on Biya?",
      answer:
        "Yes, we encourage family involvement. Biya offers features that allow you to include a guardian (wali) in the conversation at appropriate stages. You can also share profiles with family members for their input and approval, maintaining traditional Islamic practices in the modern matchmaking process.",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would implement the logic to send the message
      alert("Your message has been sent. We'll get back to you soon!");
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header title={"Help & Support"} />
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Frequently asked questions
                </Text>
                <Text style={styles.sectionDescription}>
                  Got questions? We've got answers! Dive into our FAQ and find
                  your payment peace of mind.
                </Text>

                <View style={styles.faqContainer}>
                  {faqData.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Do you have any questions
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Write your concerns here"
                    placeholderTextColor="#999"
                    multiline
                    value={message}
                    onChangeText={setMessage}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send message</Text>
          </TouchableOpacity>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  faqContainer: {
    marginTop: 8,
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    flex: 1,
    paddingRight: 8,
  },
  plusIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FF1493",
    justifyContent: "center",
    alignItems: "center",
  },
  faqAnswerContainer: {
    padding: 16,
    paddingTop: 0,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  input: {
    padding: 16,
    fontSize: 15,
    color: "#333",
    minHeight: 100,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#8C9EFF", // Light purple/blue color
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width:"90%",
    marginHorizontal:"auto",
    marginBottom:20
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
