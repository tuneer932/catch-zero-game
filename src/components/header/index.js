import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function Header(props) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: props.isGameCompleted ? "orange" : "green" },
      ]}
    ></View>
  );
}
