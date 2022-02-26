import React, { FC } from "react";
import { Text, View } from "react-native";

const WHITE = "rgb(181, 136, 99)";
const BLACK = "rgb(240, 217, 181)";

interface BaseProps {
  white: boolean;
}
interface RowProps extends BaseProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square = ({ row, col, white }: SquareProps) => {
  const backgroundColor = white ? WHITE : BLACK;
  const textStyle = {
    fontWeight: "500" as const,
    color: white ? BLACK : WHITE,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        padding: 4,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={[
          textStyle,
          {
            opacity: col === 0 ? 1 : 0,
          },
        ]}
      >
        {8 - row}
      </Text>
      {row === 7 && (
        <Text
          style={[
            textStyle,
            {
              alignSelf: "flex-end",
            },
          ]}
        >
          {String.fromCharCode(97 + col)}
        </Text>
      )}
    </View>
  );
};

const Row = ({ row, white }: RowProps) => {
  const offset = white ? 0 : 1;

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {new Array(8).fill(0).map((_, col) => (
        <Square
          key={col}
          row={row}
          col={col}
          white={(col + offset) % 2 === 1}
        />
      ))}
    </View>
  );
};

const Background = () => {
  return (
    <View style={{ flex: 1 }}>
      {new Array(8).fill(0).map((_, row) => (
        <Row key={row} white={row % 2 === 0} row={row}></Row>
      ))}
    </View>
  );
};

export default Background;
