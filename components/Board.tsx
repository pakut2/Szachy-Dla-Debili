import React, { FC, Fragment, useCallback, useState } from "react";
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

const Board: FC = () => {
  const chess = useConst(() => new Chess());

  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });

  const [moves, setMoves] = useState(Math.floor(Math.random() * 6) + 1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [enabled, setEnabled] = useState(false);

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

      setEnabled(false);
      setButtonDisabled(false);
    }
  }, [chess, state.player, moves]);

  const [game, setGame] = useState("");

  const gameOver = () => {
    setGame("Game Over");
  };

  const randomHandler = () => {
    setMoves(Math.floor(Math.random() * 6) + 1);
    setButtonDisabled(true);
    setEnabled(true);
  };

  return (
    <Fragment>
      <IconButton
        icon={`dice-${moves}`}
        size={50}
        color="#fff"
        style={{
          flexDirection: "row",
          alignSelf: "center",
          transform: [{ rotate: "180deg" }],
        }}
        disabled={state.player === "w" || buttonDisabled}
        onPress={randomHandler}
      />
      <Text style={{ color: "#fff" }}>{game}</Text>
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
                  gameOver={gameOver}
                  enabled={enabled && state.player === square.color}
                  rotate={state.player === "b"}
                />
              );
            }
          })
        )}
      </View>
      <IconButton
        icon={`dice-${moves}`}
        size={50}
        color="#fff"
        style={{ flexDirection: "row", alignSelf: "center" }}
        disabled={state.player === "b" || buttonDisabled}
        onPress={randomHandler}
      />
    </Fragment>
  );
};

export default Board;

// TODO
//* Win condition - stalemate
//* Move timer
//? Websockets
//! Underline fix
