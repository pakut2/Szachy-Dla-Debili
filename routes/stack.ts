import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeView from "../views/HomeView";
import ChessView from "../views/ChessView";

const screens = {
  HomeView: {
    screen: HomeView,
  },
  ChessView: {
    screen: ChessView,
  },
};

const stack = createStackNavigator(screens);

export default createAppContainer(stack);
