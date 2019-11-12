import * as React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ScreenManager } from "react-native-navigation-wrapper";
import * as MagicMove from "react-native-magic-move";
import Navigator from "./Navigator";

export default function ModalNavigation(componentName) {
  const screens = ScreenManager.getScreens();
  const ModalNavigator = createStackNavigator(screens, {
    initialRouteName:
      typeof componentName === "function" ? componentName.name : componentName,
    mode: "modal",
    headerMode: "none"
  });

  const Container = createAppContainer(ModalNavigator);

  return class extends React.Component {
    static navigationOptions = () => navigationOptions;

    render() {
      return (
        <MagicMove.Scene>
          <Container
            ref={navigator => Navigator.setModalNavigator(navigator)}
            screenProps={this.props}
          />
        </MagicMove.Scene>
      );
    }
  };
}
