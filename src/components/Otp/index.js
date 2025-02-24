import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Container from "../../components/Container";
import colors from "../../constants/colors";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader";

const OtpVerification = ({ type, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const CORRECT_OTP = "123456"; // Dummy OTP for validation

  // Timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else {
        clearInterval(countdown);
        setShowResend(true);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  // Handle OTP input change
  const handleOtpChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (text && index === 5) {
      const enteredOtp = newOtp.join("");
      if (enteredOtp === CORRECT_OTP) {
        setIsSuccess(true);
        setIsError(false);
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
    } else {
      setIsError(false);
      setIsSuccess(false);
    }
  };

  // Handle key press for backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Check if all 6 digits are entered
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Handle resend
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setSeconds(30);
    setMinutes(0);
    setShowResend(false);
    setIsError(false);
    setIsSuccess(false);
    inputs.current[0].focus();
  };

  const handleVerify = () => {
    if (isOtpComplete && isSuccess) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onVerify(); // Callback to parent
      }, 2000);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>
              {type === "phone"
                ? "OTP Verification"
                : "Enter Verification Code"}
            </Text>
            <Text style={styles.subtitle}>
              {type === "phone"
                ? "Enter the OTP sent to your mobile number."
                : "Enter the verification code sent to your email ID."}
            </Text>

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    isSuccess && styles.successInput,
                    isError && styles.errorInput,
                    !isSuccess &&
                      !isError &&
                      activeIndex === index &&
                      styles.activeInput,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {isError && <Text style={styles.errorText}>Invalid OTP</Text>}

            {showResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timer}>
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
              </Text>
            )}
          </ScrollView>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            <Button
              title={type === "phone" ? "Verify OTP" : "Verify"}
              style={[
                isOtpComplete && isSuccess
                  ? styles.buttonActive
                  : styles.buttonDisabled,
                { width: "100%" },
              ]}
              disabled={!isOtpComplete || isError}
              onPress={handleVerify}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <Loader isLoading={loading} />
    </Container>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 30,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 50,
  },
  otpInput: {
    width: 20,
    height: 50,
    fontSize: 18,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    color: "#000",
  },
  activeInput: {
    borderBottomColor: colors.primary,
  },
  successInput: {
    borderBottomColor: colors.secondary,
    color: colors.secondary,
  },
  errorInput: {
    borderBottomColor: "red",
    color: "red",
  },
  timer: {
    color: "#666",
    marginVertical: 20,
    textAlign: "center",
    fontSize: 16,
  },
  resendText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 16,
    marginTop: 100,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "white",
  },
  buttonActive: {
    backgroundColor: colors.secondary,
  },
  buttonDisabled: {
    backgroundColor: "#0C3BDE66",
  },
});
