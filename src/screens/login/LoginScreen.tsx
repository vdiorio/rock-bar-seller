import React, { useState } from "react";
import {
  Image,
  View,
  Dimensions,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import Main from "../../components/Main";
import { StyleSheet } from "react-native";
import { login } from "../../helpers/serverCalls";

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
});

export default function LoginScreen() {
  const logo = require("../../../assets/logo.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoad, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    login({ email, password })
      .then((response) => console.log(response))
      .catch((response) => console.log(response))
      .finally(() => setLoading(false));
  };

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
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholderTextColor="#F5ECFF"
          style={styles.input}
          placeholder="********"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {loginLoad ? (
          // Show the loading indicator when loginLoad is true
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          // Render the button when loginLoad is false
          <TouchableWithoutFeedback onPress={handleLogin} disabled={loginLoad}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </Main>
  );
}
