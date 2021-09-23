import React, { FC } from "react";
import { View } from "react-native";
import { globalStyles } from "./style/global";
import Navigator from "./routes/stack";
import HomeView from "./views/HomeView";

const App: FC = () => {
  return <Navigator />;
};

export default App;
