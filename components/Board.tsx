import React, { Fragment, useCallback, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { Chess } from "chess.js";
import Piece from "./Piece";
import Background from "./Background";
import { SIZE } from "../utils/notation";
import { useConst } from "../utils/hooks/useConst";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const chess = useConst(() => new Chess());

  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });

  const [moves, setMoves] = useState(Math.floor(Math.random() * 6) + 1);

  const swapTurn = (color: string) => {
    let tokens = chess.fen().split(" ");
    tokens[1] = color;
    tokens[3] = "-";
    chess.load(tokens.join(" "));
  };

  const onTurn = useCallback(() => {
    if (moves > 1) {
      swapTurn(state.player);

      setState({
        player: state.player,
        board: chess.board(),
      });

      setMoves(moves - 1);
    } else {
      setState({
        player: state.player === "w" ? "b" : "w",
        board: chess.board(),
      });

      setMoves(Math.floor(Math.random() * 6) + 1);
    }
  }, [chess, state.player, moves]);

  //* Normal Chess
  // const onTurn = useCallback(() => {
  //   setState({
  //     player: state.player === "w" ? "b" : "w",
  //     board: chess.board(),
  //   });
  // }, [chess, state.player]);

  // const randomHandler = () => {
  //   setEnabled(true);

  //   setMoves(Math.floor(Math.random() * 6) + 1);
  // };

  return (
    <Fragment>
      <Text style={{ color: "#fff" }}>{moves}</Text>
      <Text style={{ color: "#fff" }}>{chess.fen()}</Text>
      <View style={styles.container}>
        <Background />
        {state.board.map((row, x) =>
          row.map((square, y) => {
            if (square === null) {
              return null;
            } else {
              return (
                <Piece
                  key={`${x}-${y}`}
                  id={`${square.color}${square.type}` as const}
                  postition={{ x: y * SIZE, y: x * SIZE }}
                  chess={chess}
                  onTurn={onTurn}
                  enabled={state.player === square.color}
                />
              );
            }
          })
        )}
      </View>
      <IconButton
        icon="dice-multiple"
        size={50}
        color="#fff"
        style={{ flexDirection: "row", alignSelf: "center" }}
        disabled
      />
    </Fragment>
  );
};

export default Board;
