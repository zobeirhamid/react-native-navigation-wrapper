import * as React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ScreenManager } from "react-native-navigation-wrapper";
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import _ from "lodash";
import Navigator from "./Navigator";
import ModalNavigation from "./ModalNavigation";
import Screen from "./Screen";

export default function StackNavigation(componentName, navigationOptions) {
  // Needed for Shared Navigation
  // const screens = ScreenManager.getScreens();
  const screens = {};
  ScreenManager.getBareScreens().forEach(
    ({ name, Component, options = {} }) => {
      screens[name] = Screen({
        Component: ModalNavigation(name),
        name,
        options: _.merge(options, Component.navigationOptions)
      });
    }
  );
  const StackNavigator = createStackNavigator(screens, {
    initialRouteName:
      typeof componentName === "function" ? componentName.name : componentName,

    navigationOptions,
    transitionConfig: () => ({
      screenInterpolator: sceneProps =>
        StackViewStyleInterpolator.forHorizontal(sceneProps)
    })
  });

  const StackComponent = createAppContainer(StackNavigator);
  return class extends React.Component {
    static navigationOptions = () => navigationOptions;

    render() {
      return (
        <StackComponent
          ref={navigatorRef => {
            Navigator.setNavigator(navigatorRef);
          }}
          screenProps={this.props}
        />
      );
    }
  };
}
