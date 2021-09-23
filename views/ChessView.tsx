import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Board from "../components/Board";
import { globalStyles } from "../style/global";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(36, 35, 32)",
  },
});

const ChessView: FC = () => {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
};

export default ChessView;
