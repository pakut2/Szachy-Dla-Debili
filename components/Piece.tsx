import { ChessInstance } from "chess.js";
import React, { Fragment, useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { PieceType } from "../types";
import { SIZE, toPosition, toTranslation } from "../utils/notation";
import { PIECES } from "../utils/pieces";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
  rotate: {
    transform: [{ rotate: "180deg" }],
  },
});

interface PieceProps {
  id: PieceType;
  postition: Vector;
  chess: ChessInstance;
  onTurn: () => void;
  gameOver: () => void;
  enabled: boolean;
  rotate: boolean;
}

const Piece = ({
  id,
  postition,
  chess,
  onTurn,
  gameOver,
  enabled,
  rotate,
}: PieceProps) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(postition.x);
  const translateY = useSharedValue(postition.y);

  const movePiece = useCallback(
    (from: any, to: any) => {
      const move = chess
        .moves({ verbose: true })
        .find((m) => m.from === from && m.to === to);

      const { x, y } = toTranslation(move ? to : from);

      translateX.value = withTiming(x);
      translateY.value = withTiming(y, {}, () => {
        isGestureActive.value = false;
      });

      if (move) {
        chess.move(move);
        onTurn();
      } else {
        gameOver();
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX + offsetX.value;
      translateY.value = translationY + offsetY.value;
    },
    onEnd: () => {
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const to = toPosition({ x: translateX.value, y: translateY.value });
      runOnJS(movePiece)(from, to);
    },
  });

  const piece = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 0,
    width: SIZE,
    height: SIZE,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const to = useAnimatedStyle(() => ({
    backgroundColor: isGestureActive.value
      ? "rgba(255, 255, 0, 0.5)"
      : "transparent",
    position: "absolute",
    zIndex: 0,
    width: SIZE,
    height: SIZE,
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  const from = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);

    return {
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      position: "absolute",
      zIndex: 0,
      width: SIZE,
      height: SIZE,
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });

  return (
    <Fragment>
      <Animated.View style={to} />
      <Animated.View style={from} />
      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={piece}>
          <Image
            source={PIECES[id]}
            style={[styles.piece, rotate && styles.rotate]}
          />
        </Animated.View>
      </PanGestureHandler>
    </Fragment>
  );
};

export default Piece;
