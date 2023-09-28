import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  cStyle?: any;
  children: React.ReactNode;
}

export default function Main({ children, cStyle = {} }: Props) {
  return <View style={[styles.container, cStyle]}>{children}</View>;
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
