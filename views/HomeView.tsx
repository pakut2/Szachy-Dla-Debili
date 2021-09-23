import React, { FC } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Background from "../components/Background";
import { globalStyles } from "../style/global";

interface Props {
  navigation: any;
}

const HomeView: FC<Props> = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={{ marginBottom: 100 }}>Home Screen</Text>
      <Button
        mode="contained"
        color="black"
        onPress={() => {
          navigation.push("ChessView");
        }}
      >
        Start
      </Button>
    </View>
  );
};

export default HomeView;
