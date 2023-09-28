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
  getProductList,
} from "../../../helpers/serverCalls";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Pedidos() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState<
    { id: number; name: string; price: number; qtd: number }[]
  >([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [commandId, setCommandId] = useState("");

  useEffect(() => {
    getProductList().then((products) => {
      const prod = products.map((p) => ({ ...p, qtd: 0 }));
      setProducts(prod);
    });
  }, []);

  const handleScannerClick = async () => {
    if (!hasPermission) {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
    setScanning(true);
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    try {
      const [, id] = data.split("?q=");
      setCommandId(id);
    } catch (e) {
      alert("QR code inválido!");
    } finally {
      setScanning(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const changeValue = (name: string, value: number) => {
    const newState = products.map((p) => {
      if (p.name === name && p.qtd + value >= 0)
        return { ...p, qtd: p.qtd + value };
      return p;
    });
    setProducts(newState);
  };

  const clearCards = () => {
    const state = products.map((p) => ({ ...p, qtd: 0 }));
    setProducts(state);
  };

  const generateProductOrder = async () => {
    const prod = products!
      .map(({ id, qtd }) => {
        if (qtd > 0) {
          return {
            productId: id,
            quantity: qtd,
          };
        }
      })
      .filter((p) => !!p) as any;
    debitProductsFromCommand(commandId, prod)
      .then(() => {
        alert("Pedido criado!");
        clearCards();
        setModalVisible(false);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <>
      <View style={styles.productContainer}>
        <ScrollView
          style={{ width: Dimensions.get("window").width * 0.95 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {products.length ? (
            products.map((p) => (
              <ProductCard
                key={p.name}
                name={p.name}
                price={p.price}
                qtd={p.qtd}
                changeValue={changeValue}
              />
            ))
          ) : (
            <ActivityIndicator
              size={Dimensions.get("window").width * 0.6}
              color="#FFFFFF"
            />
          )}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Limpar Comanda" onPress={clearCards} color="#757687" />
        <Button
          title="Gerar Pedido"
          disabled={!products.reduce((a, c) => c.qtd + a, 0)}
          onPress={showModal}
          color="#708AF4"
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible && !scanning}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {products
              .filter((p) => p.qtd > 0)
              .map((p) => (
                <View key={p.name} style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {p.name} x{p.qtd}
                  </Text>
                  <Text style={styles.productTotal}>
                    R${(p.price * p.qtd).toFixed(2)}
                  </Text>
                </View>
              ))}

            <View style={[styles.productInfo, styles.bottomList]}>
              <Text style={styles.productName}>Total:</Text>
              <Text style={styles.productTotal}>
                R${products.reduce((a, c) => c.price * c.qtd + a, 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={commandId}
                placeholder="Comanda"
                keyboardType="numeric"
                onChangeText={(n) => setCommandId(n)}
              />
              <TouchableOpacity onPress={handleScannerClick}>
                <Ionicons name="qr-code-outline" size={32} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Confirmar" onPress={generateProductOrder} />
            </View>
          </View>
        </View>
      </Modal>
      {scanning && (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.scanner}
            type="back"
          />
          <Text style={styles.scannerText}>
            Escaneie o código QR da comanda
          </Text>
          <Button title="Cancelar" onPress={() => setScanning(false)} />
        </View>
      )}
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
    height: "80%",
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
