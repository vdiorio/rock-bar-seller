import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  name: string;
  price: number;
  qtd: number;
  changeValue: (name: string, value: number) => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B203A",
    paddingHorizontal: 10,
    margin: 5,
    borderColor: "#DEF5F4",
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-evenly", // Adjust to evenly space elements
    alignItems: "center", // Center vertically
    paddingBottom: 15,
  },
  text: {
    color: "white",
    margin: 10,
    fontSize: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  quantityButton: {
    backgroundColor: "#708AF4", // Dark red color for buttons
    padding: 10,
    aspectRatio: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 16,
    margin: 10,
  },
});

export default function ProductCard({ name, price, qtd, changeValue }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.text}>{name}:</Text>
        <Text style={styles.text}>R$ {price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => changeValue(name, -1)}
        >
          <FontAwesome color="#DEF5F4" size={30} name="arrow-down" />
        </TouchableOpacity>
        <Text style={styles.text}>{qtd}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => changeValue(name, 1)}
        >
          <FontAwesome color="#DEF5F4" size={30} name="arrow-up" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
