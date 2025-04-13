"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import EmojiSelector from "react-native-emoji-selector";

// Import separated components
import NegotiationPopup from "../../components/NegotiationPopup/NegotiationPopup";
import ExtensionModal from "../../components/ExtensionModal/ExtensionModal";

// Import message filtering utilities
import {
  checkForbiddenContent,
  getWarningMessage,
} from "../../utils/message-filter";
import Container from "../../components/Container";

export default function ChatDetailScreen() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showNegotiationPopup, setShowNegotiationPopup] = useState(true);
  const [negotiationTimeMinutes, setNegotiationTimeMinutes] = useState(60); // 1 hour in minutes
  const [extensionHours, setExtensionHours] = useState(1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello there!",
      sender: "other",
      timestamp: "5:35 PM",
    },
    {
      id: "2",
      text: "Nice to meet you.",
      sender: "other",
      timestamp: "5:36 PM",
    },
    {
      id: "3",
      text: "Hi! Nice to meet you too!",
      sender: "me",
      timestamp: "5:38 PM",
    },
  ]);

  const scrollViewRef = useRef();
  const modalizeRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { chatItem } = route.params;

  // Add keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => {
        setKeyboardVisible(true);
        setShowEmojiPicker(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Timer effect for negotiation time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNegotiationTimeMinutes((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSend = () => {
    if (message.trim()) {
      // Check for forbidden content
      const {
        containsForbiddenContent,
        containsMobileNumber,
        containsUrl,
        filteredMessage,
      } = checkForbiddenContent(message);

      if (containsForbiddenContent) {
        // Show warning as an alert
        Alert.alert(
          "Warning",
          getWarningMessage(containsMobileNumber, containsUrl),
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );

        // Create a new message with filtered content
        const newMessage = {
          id: Date.now().toString(),
          text: filteredMessage,
          sender: "me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        // Add message to the chat
        setMessages([...messages, newMessage]);

        // Clear the input
        setMessage("");
      } else {
        // Hide warning when user sends a message
        if (showWarning) {
          setShowWarning(false);
        }

        // Create a new message
        const newMessage = {
          id: Date.now().toString(),
          text: message.trim(),
          sender: "me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        // Add message to the chat
        setMessages([...messages, newMessage]);

        // Clear the input
        setMessage("");
      }

      // Close emoji picker if open
      if (showEmojiPicker) {
        setShowEmojiPicker(false);
      }

      // Simulate a response after 1-2 seconds
      if (messages.length % 3 === 0) {
        setTimeout(() => {
          const responseMessage = {
            id: Date.now().toString(),
            text: "Thanks for your message!",
            sender: "other",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prevMessages) => [...prevMessages, responseMessage]);
        }, 1000 + Math.random() * 1000);
      }
    }
  };

  const toggleEmojiPicker = () => {
    // Close keyboard if open when showing emoji picker
    Keyboard.dismiss();

    // Toggle emoji picker with a short delay for Android
    if (Platform.OS === "android") {
      setTimeout(() => {
        setShowEmojiPicker(!showEmojiPicker);
      }, 100);
    } else {
      setShowEmojiPicker(!showEmojiPicker);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
  };

  const openExtensionModal = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  const closeNegotiationPopup = () => {
    setShowNegotiationPopup(false);
  };

  const handleExtendTime = () => {
    // Here you would handle the actual time extension logic
    setNegotiationTimeMinutes(negotiationTimeMinutes + extensionHours * 60);
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
    setShowNegotiationPopup(false);
  };

  const incrementExtensionHours = () => {
    setExtensionHours((prev) => Math.min(prev + 1, 5)); // Max 5 hours
  };

  const decrementExtensionHours = () => {
    setExtensionHours((prev) => Math.max(prev - 1, 1)); // Min 1 hour
  };

  const renderMessage = (item, index) => {
    const isMe = item.sender === "me";
    const showAvatar =
      index === 0 ||
      (messages[index - 1] && messages[index - 1].sender !== item.sender);

    return (
      <View
        key={item.id}
        style={[
          styles.messageRow,
          isMe ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <Container>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{chatItem.name}</Text>
            <Text style={styles.headerStatus}>Last seen 5 minutes ago</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="more-vertical" size={22} color="#0C3BDE" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Content */}
      <ScrollView
        ref={scrollViewRef}
        style={[
          styles.chatContent,
          showEmojiPicker && {
            height: Platform.OS === "android" ? "45%" : "40%",
          },
        ]}
        contentContainerStyle={styles.chatContentContainer}
      >
        {showWarning && (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              Warning! Please do not release your number too easily unless you
              form trust between each other.
            </Text>
            <Text style={styles.warningBold}>Trust takes time.</Text>
            <Text style={styles.warningText}>
              You may use other platforms to chat if you so desire.
            </Text>
          </View>
        )}

        {/* Messages */}
        <View style={styles.messagesContainer}>
          {messages.map(renderMessage)}
        </View>
      </ScrollView>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <View style={styles.emojiPickerHeader}>
            <Text style={styles.emojiPickerTitle}>Emojis</Text>
            <TouchableOpacity onPress={toggleEmojiPicker}>
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <EmojiSelector
            onEmojiSelected={handleEmojiSelect}
            showSearchBar={false}
            showTabs={true}
            showHistory={Platform.OS === "ios"}
            columns={8}
            theme={
              Platform.OS === "android"
                ? {
                    backgroundColor: "#fff",
                    categoryHighlightColor: "#0066ff",
                    borderColor: "#E0E0E0",
                  }
                : undefined
            }
          />
        </View>
      )}

      {/* Negotiation Popup Component */}
      {showNegotiationPopup && (
        <NegotiationPopup
          negotiationTimeMinutes={negotiationTimeMinutes}
          onClose={closeNegotiationPopup}
          onExtendPress={openExtensionModal}
        />
      )}

      {/* Footer */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={styles.footer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
            onFocus={() => {
              setShowEmojiPicker(false);
            }}
          />
          <TouchableOpacity
            style={styles.emojiButton}
            onPress={toggleEmojiPicker}
          >
            <Feather
              name="smile"
              size={20}
              color={showEmojiPicker ? "#0066ff" : "#666"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.micButton}>
            <Feather name="mic" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Feather name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Extension Modal Component */}
      <ExtensionModal
        modalizeRef={modalizeRef}
        negotiationTimeMinutes={negotiationTimeMinutes}
        extensionHours={extensionHours}
        incrementExtensionHours={incrementExtensionHours}
        decrementExtensionHours={decrementExtensionHours}
        handleExtendTime={handleExtendTime}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerInfo: {
    justifyContent: "center",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  headerStatus: {
    fontSize: 12,
    color: "#666",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    borderColor: "#0C3BDE",
    borderWidth: 2,
    padding: 2,
    borderRadius: 20,
    marginLeft: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  warningContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  warningText: {
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },
  warningBold: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  messagesContainer: {
    flex: 1,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  myMessageRow: {
    justifyContent: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 16,
    borderRadius: 18,
    position: "relative",
  },
  myMessageBubble: {
    backgroundColor: "#FFEDF5",
    borderBottomRightRadius: 0,
  },
  otherMessageBubble: {
    backgroundColor: "#ececec",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    marginRight: 70,
  },
  messageTime: {
    fontSize: 11,
    color: "#999",
    position: "absolute",
    right: 10,
    bottom: 7,
  },
  emojiPickerContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    height: Platform.OS === "android" ? 280 : 300,
    ...(Platform.OS === "android" && {
      zIndex: 1000,
      elevation: 3,
      borderTopWidth: 1,
      borderColor: "#e0e0e0",
    }),
  },
  emojiPickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  emojiPickerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "android" ? 5 : 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: Platform.OS === "android" ? 5 : 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  emojiButton: {
    marginHorizontal: 5,
    padding: 5,
  },
  micButton: {
    marginLeft: 5,
    padding: 5,
  },
  sendButton: {
    backgroundColor: "#0066ff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Platform.OS === "android" ? 5 : 10,
  },
  sendButtonDisabled: {
    backgroundColor: "#b3d1ff",
  },
});
