import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { RadioButton } from "react-native-paper";

export default function HiddenModal() {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("URL PADRAO"); // Default selection

  const styles = StyleSheet.create({
    hiddenButton: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "25%",
      height: "15%",
      backgroundColor: "rgba(0,0,0,0)",
    },
    inputContainer: {
      display: selectedOption === "URL CUSTOMIZADA" ? "flex" : "none", // Show input when "URL CUSTOMIZADA" is selected
    },
  });

  const handleConfirm = () => {
    // Handle the confirmation here, based on selectedOption and the input value
  };

  return (
    <>
      <TouchableOpacity
        style={styles.hiddenButton}
        onLongPress={() => setVisible(true)}
        delayLongPress={7000}
      />
      <Modal visible={visible} animationType="slide">
        <View>
          <View>
            <RadioButton
              value="first"
              status={true ? "checked" : "unchecked"}
            />
            <RadioButton
              value="second"
              status={false ? "checked" : "unchecked"}
            />
            <Text>URL CUSTOMIZADA</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Comanda" keyboardType="numeric" />
          </View>
          <View>
            <Button title="Cancelar" onPress={() => setVisible(false)} />
            <Button title="Confirmar" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </>
  );
}
