import { Alert } from "react-native";
export default ErrorAlert = (error) => {
    Alert.alert(
      "Error",
      error.message || "Terjadi kesalahan saat menyimpan perubahan.",
      [{ text: "OK" }]
    );
}