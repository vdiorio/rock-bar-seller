import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { cancelOrder } from "../../../helpers/serverCalls";

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

export default function OrderCard({ order, refreshOrders }: Props) {
  const handleCancelOrder = () => {
    Alert.alert(
      "Tem certeza?",
      'Cancelar o pedido extornará o valor para a comanda do cliente e invalidará sua venda. Para confirmar clique em "Sim"',
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => cancelOrder(order.id).then(refreshOrders),
          style: "default",
        },
      ]
    );
  };

  function formatDateString(inputString: string) {
    const inputDate = new Date(inputString);
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month} ${hours}:${minutes}`;
  }

  const tableHead = ["Produto", "Quantidade"];
  const tableData = order.products.map((p) => [
    p.product.name,
    String(p.quantity),
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido nº {order.id}</Text>
      <Table
        borderStyle={{
          borderWidth: 2,
          borderColor: "#00C6C2",
        }}
      >
        <Row
          data={["Comanda:", order.commandId]}
          textStyle={[styles.text, { textAlign: "center" }]}
          style={{ backgroundColor: "#2E2A3C" }}
        />
        <Row
          data={["Valor:", `R$ ${order.value.toFixed(2)}`]}
          textStyle={[styles.text, { textAlign: "center" }]}
          style={{ backgroundColor: "#414564" }}
        />
        <Row
          data={["Data:", formatDateString(order.orderedAt)]}
          textStyle={[styles.text, { textAlign: "center" }]}
          style={{ backgroundColor: "#2E2A3C" }}
        />
        <Row
          data={["Status:", order.status === "OK" ? "OK" : "Cancelado"]}
          textStyle={[styles.text, { textAlign: "center" }]}
          style={{ backgroundColor: "#414564" }}
        />
      </Table>
      <Text style={[styles.title, { marginTop: 20 }]}>Produtos:</Text>
      <Table
        borderStyle={{
          borderWidth: 2,
          borderColor: "#00C6C2",
          width: "100%",
        }}
        style={{ marginBottom: 20 }}
      >
        <Row
          data={tableHead}
          textStyle={[styles.text, { textAlign: "center" }]}
          style={{ backgroundColor: "#708AF4" }}
        />
        {tableData.map((rowData, i) => {
          const backgroundColor = i % 2 ? "#414564" : "#2E2A3C";
          return (
            <Row
              key={i}
              data={rowData}
              textStyle={[styles.text, { textAlign: "center" }]}
              style={{ backgroundColor }}
            />
          );
        })}
      </Table>
      {order.status === "OK" && (
        <Button color="#E7023D" title="Cancelar" onPress={handleCancelOrder} />
      )}
    </View>
  );
}
