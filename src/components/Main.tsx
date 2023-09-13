import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function Main({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#090919",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  },
});
