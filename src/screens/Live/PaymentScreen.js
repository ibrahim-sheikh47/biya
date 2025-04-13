// screens/PaymentScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import Container from "../../components/Container";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onPaymentSuccess } = route.params || {};
  const [selectedPlan, setSelectedPlan] = useState("annual"); // "annual", "twoYears", "monthly"

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceed = () => {
    // Navigate back and trigger the success callback
    navigation.goBack();
    if (onPaymentSuccess) {
      onPaymentSuccess();
    }
  };

  return (
    <Container style={styles.container}>
      <StatusBar backgroundColor="#FF0080" barStyle="light-content" />
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Header title={"Payment"} />
          <Text style={styles.earlyBirdText}>Early bird offers</Text>
        </View>

        {/* Subscription Info */}
        <Text style={styles.subscriptionInfo}>
          To view interesting profiles subscribe to a{" "}
          <Text style={styles.boldText}>monthly / annual / 2 Years</Text> plan.
        </Text>

        {/* Plan Options */}
        <View style={styles.plansContainer}>
          <View style={styles.topPlansRow}>
            {/* Annual Plan */}
            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === "annual" && styles.selectedPlanCard,
              ]}
              onPress={() => handlePlanSelection("annual")}
            >
              <Text style={styles.planType}>Annual</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currencySymbol}>£</Text>
                <Text style={styles.planPrice}>40</Text>
              </View>
              <Text style={styles.priceBreakdown}>(£3.33 per month)</Text>
              <View
                style={[
                  styles.radioButton,
                  selectedPlan === "annual" && styles.radioButtonSelected,
                ]}
              >
                {selectedPlan === "annual" && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>

            {/* 2 Years Plan */}
            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === "twoYears" && styles.selectedPlanCard,
              ]}
              onPress={() => handlePlanSelection("twoYears")}
            >
              <Text style={styles.planType}>2 Years</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currencySymbol}>£</Text>
                <Text style={styles.planPrice}>65</Text>
              </View>
              <Text style={styles.priceBreakdown}>(£2.7 per month)</Text>
              <View
                style={[
                  styles.radioButton,
                  selectedPlan === "twoYears" && styles.radioButtonSelected,
                ]}
              >
                {selectedPlan === "twoYears" && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === "monthly" && styles.selectedPlanCard,
            ]}
            onPress={() => handlePlanSelection("monthly")}
          >
            <Text style={styles.planType}>Monthly</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currencySymbol}>£</Text>
              <Text style={styles.planPrice}>5</Text>
            </View>
            <Text style={styles.priceBreakdown}>(£5 per month)</Text>
            <View
              style={[
                styles.radioButton,
                selectedPlan === "monthly" && styles.radioButtonSelected,
              ]}
            >
              {selectedPlan === "monthly" && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Future Pricing Notice */}
        <Text style={styles.pricingNotice}>
          Pricing will be changed to the following from January 2025 onwards due
          to app maintenance.
        </Text>

        {/* Future Pricing Table */}
        <View style={styles.futurePricingContainer}>
          <View style={styles.futurePricingRow}>
            <Text style={styles.futurePricingCell}>Annual</Text>
            <Text style={styles.futurePricingCell}>2 Years</Text>
            <Text style={styles.futurePricingCell}>Monthly</Text>
          </View>
          <View style={styles.futurePricingRow}>
            <Text style={styles.futurePricingPrice}>€ 60</Text>
            <Text style={styles.futurePricingPrice}>€ 95</Text>
            <Text style={styles.futurePricingPrice}>€ 7</Text>
          </View>
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  earlyBirdText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#FF0080",
    marginTop: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginLeft: 20,
  },
  subscriptionInfo: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  boldText: {
    fontWeight: "bold",
  },
  plansContainer: {
    paddingHorizontal: 20,
  },
  topPlansRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    width: "48%",
    padding: 15,
    marginBottom: 15,
    position: "relative",
  },
  selectedPlanCard: {
    borderColor: "#0049FF",
    borderWidth: 2,
  },
  planType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "bold",
  },
  priceBreakdown: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  radioButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    marginTop: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#0049FF",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0049FF",
  },
  pricingNotice: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  futurePricingContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
  },
  futurePricingRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  futurePricingCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  futurePricingPrice: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: "#0049FF",
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
