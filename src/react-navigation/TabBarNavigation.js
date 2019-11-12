import * as React from "react";
import { transformer } from "react-native-navigation-wrapper";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { tabFormat, tabBarFormat } from "./formats";
import StackNavigation from "./StackNavigation";
import Navigator from "./Navigator";
// gets the current screen from navigation state

export default function TabBarNavigation(
  tabBarOptionsRaw,
  tabContainerFunction
) {
  function getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  }

  const tabs = {};
  const tabBarOptions = transformer(tabBarFormat, tabBarOptionsRaw);
  tabContainerFunction(tab => {
    tabs[tab.route] = StackNavigation(tab.route, transformer(tabFormat, tab));
  });

  const keys = Object.keys(tabs);
  const TabNavigator = createBottomTabNavigator(tabs, {
    tabBarOptions
  });

  const TabContainer = createAppContainer(TabNavigator);
  return () => (
    <TabContainer
      onNavigationStateChange={(prevState, currentState, action) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);

        if (prevScreen !== currentScreen) {
          Navigator.changeNavigator(keys.indexOf(currentScreen));
        }
      }}
    />
  );
}
