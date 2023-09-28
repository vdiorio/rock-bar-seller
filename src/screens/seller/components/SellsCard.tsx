import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { cancelOrder, getItemsSold } from "../../../helpers/serverCalls";
import { useEffect, useState } from "react";

interface Props {
  order: {
    id: number;
    commandId: number;
    orderedAt: string;
    status: string;
    value: number;
    products: {
      orderId: number;
      product: { name: string };
      quantity: number;
    }[];
  };
  refreshOrders: () => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B203A",
    padding: 10,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    margin: 5,
    borderColor: "#DEF5F4",
    borderWidth: 1,
  },
  text: {
    fontFamily: "sans-serif",
    fontSize: 16,
    color: "#ECEEFF",
    marginVertical: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  row: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    padding: 0,
    color: "#f1f8ff",
  },
});

export default function SellsCard() {
  const [products, setProducts] = useState<any[] | null>(null);

  useEffect(() => {
    getItemsSold()
      .then((resp) => setProducts(resp))
      .catch((e) => console.log(e));
  }, []);

  const tableHead = ["Produto", "Quantidade"];
  return (
    <>
      {products ? (
        <View style={styles.container}>
          {products.length ? (
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: "#00C6C2",
              }}
            >
              <Row
                data={tableHead}
                textStyle={[styles.text, { textAlign: "center" }]}
                style={{ backgroundColor: "#708AF4" }}
              />
              {products.map((p, i) => {
                const backgroundColor = i % 2 ? "#414564" : "#2E2A3C";
                return (
                  <Row
                    key={i}
                    data={[p.product, p.sold]}
                    textStyle={[styles.text, { textAlign: "center" }]}
                    style={{ backgroundColor }}
                  />
                );
              })}
            </Table>
          ) : (
            <Text style={styles.text}>Nada por aqui ainda.</Text>
          )}
        </View>
      ) : (
        <ActivityIndicator
          size={Dimensions.get("window").width * 0.6}
          color="#FFFFFF"
        />
      )}
    </>
  );
}
