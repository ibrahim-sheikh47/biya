import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import OtpVerification from "../../components/Otp";

const VerificationScreen = ({ route }) => {
  const navigation = useNavigation();

  // Determine the type of verification (email or phone) based on route params
  const type = route?.params?.type || "email";

  return (
    <Container>
      <OtpVerification
        type={type}
        onVerify={() => {
          if (type === "email") {
            navigation.navigate("AddPhoneScreen");
          } else {
            navigation.navigate("Consent");
          }
        }}
      />
    </Container>
  );
};

export default VerificationScreen;
