import "react-native-gesture-handler";
import * as MagicMove from "react-native-magic-move";
import * as React from "react";
import { AppRegistry } from "react-native";
// import { Navigation } from "react-native-navigation";
import { ScreenManager } from "react-native-navigation-wrapper";
import Screen from "./Screen";
import SharedElement from "./SharedElement";
import TabBarNavigation from "./TabBarNavigation";
import StackNavigation from "./StackNavigation";
import ModalNavigation from "./ModalNavigation";
import Navigator from "./Navigator";

function registerApplication(appName, Root) {
  /*
  Navigation.registerComponent(appName, () =>
    ScreenManager.applyProviders(Root)
  );
  Navigation.setRoot({
    root: {
      component: { name: appName }
    }
  });
  */
  ScreenManager.addProvider(MagicMove.Provider);

  AppRegistry.registerComponent(appName, () =>
    ScreenManager.applyProviders(Root)
  );
}

const handler = {
  get(obj, prop) {
    if (prop in obj || obj.hasOwnProperty(prop)) {
      return obj[prop];
    }

    const navigator = Navigator;
    if (
      navigator !== null &&
      (prop in navigator || navigator.hasOwnProperty(prop))
    ) {
      return navigator[prop];
    }
  }
};

export default new Proxy(
  {
    Screen,
    SharedElement,
    registerApplication,
    createTabRoot: (tabBarOptions, tabContainerFunction) =>
      TabBarNavigation(tabBarOptions, tabContainerFunction),
    createStackRoot: stackScreen => StackNavigation(stackScreen)
    /*
    initiateScreen: (name, Component) => props => (
        <MagicMove.Scene>
          <Component {...props} />
        </MagicMove.Scene>
      )
      */
  },
  handler
);
