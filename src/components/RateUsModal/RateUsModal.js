"use client";

import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { Ionicons } from "@expo/vector-icons";
import images from "../../constants/images";

// This component will be imported and used in your DrawerNavigator file
export const RateUsModal = ({ isVisible, onClose }) => {
  const modalizeRef = useRef(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Open/close the modal based on the isVisible prop
  React.useEffect(() => {
    if (isVisible && modalizeRef.current) {
      modalizeRef.current.open();
    } else if (!isVisible && modalizeRef.current) {
      modalizeRef.current.close();
    }
  }, [isVisible]);

  const handleSubmit = () => {
    // Here you would handle submitting the rating
    console.log("Rating submitted:", selectedRating, comment);
    setIsSubmitted(true); // Show thank you screen
  };

  const handleGoHome = () => {
    setIsSubmitted(false); // Reset the submission state for next time
    onClose(); // Close the modal
  };

  const ratings = [
    { value: 1, label: "Very bad", emoji: "😠" },
    { value: 2, label: "Bad", emoji: "🙁" },
    { value: 3, label: "Neutral", emoji: "😐" },
    { value: 4, label: "Good", emoji: "🙂" },
    { value: 5, label: "Very good", emoji: "😍" },
  ];

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={430}
      handleStyle={styles.modalHandle}
      onClose={() => {
        setIsSubmitted(false); // Reset when closed
        onClose();
      }}
      modalStyle={styles.modalContainer}
    >
      {!isSubmitted ? (
        // Rating Form Content
        <View style={styles.contentContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>

          {/* Header */}
          <Text style={styles.title}>Like using Biya app?</Text>
          <Text style={styles.subtitle}>
            Allow us to improve with your ratings & valuable feedbacks.
          </Text>

          {/* Rating options */}
          <View style={styles.ratingContainer}>
            {ratings.map((rating) => (
              <TouchableOpacity
                key={rating.value}
                style={styles.ratingItem}
                onPress={() => setSelectedRating(rating.value)}
              >
                <View
                  style={[
                    styles.emojiContainer,
                    selectedRating === rating.value && styles.selectedEmoji,
                  ]}
                >
                  <Text style={styles.emoji}>{rating.emoji}</Text>
                </View>
                <Text
                  style={[
                    styles.ratingLabel,
                    selectedRating === rating.value && styles.selectedLabel,
                  ]}
                >
                  {rating.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment input */}
          <TextInput
            style={styles.commentInput}
            placeholder="Your comments please (optional)"
            placeholderTextColor="#9CA3AF"
            multiline
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />

          {/* Submit button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedRating
                ? styles.submitButtonActive
                : styles.submitButtonInactive,
            ]}
            onPress={handleSubmit}
            disabled={!selectedRating}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Thank You Screen Content
        <View style={styles.thankYouContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>

          {/* Thank you content */}
          <View style={styles.thankYouContent}>
            <View style={styles.thankYouImageContainer}>
              <View style={styles.illustrationContainer}>
                {/* Placeholder for your actual image */}
                <Image
                  source={images.feedbackImg}
                  style={styles.illustration}
                />
              </View>
            </View>

            <Text style={styles.thankYouTitle}>
              Thank you for your valuable feedback
            </Text>
            <Text style={styles.thankYouSubtitle}>
              By making your voice heard you help us improve.
            </Text>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleGoHome}
            >
              <Text style={styles.homeButtonText}>Go to home page</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modalize>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHandle: {
    backgroundColor: "#E0E0E0",
    width: 40,
    height: 5,
    borderRadius: 3,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginTop: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  ratingItem: {
    alignItems: "center",
    width: "18%", // Slightly reduced to prevent overflow
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  selectedEmoji: {
    backgroundColor: "rgba(239, 68, 140, 0.1)",
  },
  emoji: {
    fontSize: 28,
  },
  ratingLabel: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  selectedLabel: {
    color: "#EF448C",
    fontWeight: "500",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    marginBottom: 20,
    fontSize: 16,
    color: "#374151",
  },
  submitButton: {
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonActive: {
    backgroundColor: "#0047FF",
  },
  submitButtonInactive: {
    backgroundColor: "#A5B4FC",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Thank You Screen Styles
  thankYouContainer: {
    padding: 24,
    minHeight: 500,
  },
  thankYouContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationContainer: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  thankYouTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    textAlign: "center",
    marginVertical: 5,
  },
  thankYouSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: "80%",
  },
  homeButton: {
    backgroundColor: "#0047FF",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});