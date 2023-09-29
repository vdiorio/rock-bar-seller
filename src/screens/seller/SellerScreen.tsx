import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Button,
  TextInput,
  Alert,
} from "react-native";
import Main from "../../components/Main";
import { StyleSheet } from "react-native";
import Produtos from "./components/Produtos";
import Retiradas from "./components/Retiradas";
import Sells from "./components/Sells";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../App";

const styles = StyleSheet.create({
  productContainer: {
    height: "50%",
  },
  scrollItems: {
    flex: 1,
    gap: 2,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    padding: 10,
  },
  tabItem: {
    paddingVertical: 10,
    borderWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    width: "25%",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#708AF4", // Blue color for selected tab indicator
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  selectedTabText: {
    color: "#708AF4", // Blue color for selected tab text
  },
});

export default function SellerScreen() {
  const [selectedTab, setSelectedTab] = useState("Produtos"); // State to track selected tab

  const MenuOption = ({ name }: { name: string }) => {
    return (
      <TouchableOpacity
        style={[styles.tabItem, selectedTab === name && styles.selectedTab]}
        onPress={() => setSelectedTab(name)}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === name && styles.selectedTabText,
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation<StackTypes>();

  const handleLogout = () =>
    Alert.alert("Sair do app?", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "default",
        onPress: () => {
          AsyncStorage.clear();
          navigation.navigate("Login");
        },
      },
    ]);

  return (
    <Main
      cStyle={{
        justifyContent: "flex-start",
        paddingTop: "10%",
        flex: 1,
        height: "100%",
      }}
    >
      <View style={styles.tabContainer}>
        <MenuOption name="Produtos" />
        <MenuOption name="Retiradas" />
        <MenuOption name="Vendas" />
        <TouchableOpacity style={styles.tabItem} onPress={handleLogout}>
          <Text style={[styles.tabText]}>Logout</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "Produtos" && <Produtos />}
      {selectedTab === "Retiradas" && <Retiradas />}
      {selectedTab === "Vendas" && <Sells />}
    </Main>
  );
}
