import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Dimensions,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Main from "../../components/Main";
import { StyleSheet } from "react-native";
import { login, validateToken } from "../../helpers/serverCalls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../App";
import HiddenModal from "./HiddenModal";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  logo: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: "contain",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    padding: "5%",
    borderRadius: 20,
    backgroundColor: "#3C4860", // Add a blue background color
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#FFFADE",
  },
  label: {
    color: "#FFFADE", // Add a dark gray color for labels
    fontSize: 16, // Increase the font size of labels
    marginBottom: 5, // Add some space below labels
  },
  loginButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Add a semi-transparent background
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default function LoginScreen() {
  const logo = require("../../../assets/logo.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoad, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation<StackTypes>();

  const handleLogin = () => {
    setErrorMessage("");
    setLoading(true);
    login({ email, password })
      .then(({ token, role, id }) =>
        AsyncStorage.multiSet([
          ["token", token],
          ["role", role],
          ["id", String(id)],
        ])
      )
      .then(() => navigation.navigate("Seller"))
      .catch(({ message }) => {
        setLoading(false);
        setErrorMessage(message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    validateToken()
      .then(() => navigation.navigate("Seller"))
      .catch(() => setLoading(false));
  }, []);

  return (
    <Main>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholderTextColor="#F5ECFF"
          style={styles.input}
          placeholder="seu@email.com.br"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholderTextColor="#F5ECFF"
          style={styles.input}
          placeholder="********"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <Button
          title="login"
          onPress={handleLogin}
          disabled={loginLoad || !email.length || !password.length}
        />
        {loginLoad && (
          // Show the loading indicator when loginLoad is true
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
      <HiddenModal />
    </Main>
  );
}
