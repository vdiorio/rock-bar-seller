import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "./ProductCard";
import {
  debitProductsFromCommand,
  getOrdersBySellerId,
  getProductList,
} from "../../../helpers/serverCalls";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "@expo/vector-icons/Ionicons";
import OrderCard from "./OrderCard";

export default function Retiradas() {
  const [orders, setOrders] = useState([]);

  const refreshOrders = () => {
    getOrdersBySellerId().then((o) => {
      setOrders(o);
    });
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <>
      <View style={styles.productContainer}>
        <ScrollView
          style={{ width: Dimensions.get("window").width * 0.95 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {orders.length ? (
            orders.map((o: any) => (
              <OrderCard key={o.id} order={o} refreshOrders={refreshOrders} />
            ))
          ) : (
            <ActivityIndicator
              size={Dimensions.get("window").width * 0.6}
              color="#FFFFFF"
            />
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 12,
  },
  productContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 15,
  },
  input: {
    height: 40,
    padding: 10,
    maxWidth: "80%",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    width: "80%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  productInfo: {
    flexDirection: "row",
    gap: 10,
    borderBottomWidth: 1,
    borderBlockColor: "lightgrey",
    padding: 10,
    width: "80%",
    justifyContent: "space-between",
  },
  bottomList: {
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productQty: {
    fontSize: 14,
  },
  productTotal: {
    fontSize: 14,
  },
  scanner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scannerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#090925",
  },
  scannerText: {
    textAlign: "center",
    margin: "10%",
    fontSize: 30,
    color: "white",
  },
});
