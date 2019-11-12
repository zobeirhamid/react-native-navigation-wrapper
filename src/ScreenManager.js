import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import _ from "lodash";
import hoistNonReactStatics from "hoist-non-react-statics";

export default class ScreenManager {
  screens = [];

  initiatedScreens = {};

  components = [];

  navigation = null;

  providers = [gestureHandlerRootHOC];

  createProvider(Provider, providerProps = {}) {
    return Component => {
      const Enhanced = React.forwardRef((props, ref) => (
        <Provider {...providerProps}>
          <Component {...props} ref={ref} />
        </Provider>
      ));
      hoistNonReactStatics(Enhanced, Component);
      return Enhanced;
    };
  }

  addProvider(Provider, providerProps = {}) {
    console.log(Provider);
    this.providers.unshift(this.createProvider(Provider, providerProps));
  }

  setNavigation(navigation) {
    this.navigation = navigation;
  }

  getScreens() {
    return this.initiatedScreens;
  }

  getActiveScreenId() {
    return this.components.length;
  }

  getComponentById(id) {
    return this.components[id];
  }

  registerScreen(screen) {
    this.screens.push(screen);
  }

  getBareScreens() {
    return this.screens;
  }

  applyProviders(Component) {
    let WrappedComponent = Component;
    this.providers.forEach(provider => {
      WrappedComponent = provider(WrappedComponent);
    });
    return WrappedComponent;
  }

  initiateScreens() {
    this.screens.forEach(({ name, Component, options }) => {
      this.initiatedScreens[name] = this.navigation.Screen({
        Component,
        options,
        name
      });
      if (this.navigation.hasOwnProperty("initiateScreen")) {
        const initiatedScreen = this.navigation.initiateScreen(
          name,
          this.initiatedScreens[name]
        );

        if (initiatedScreen !== undefined) {
          this.initiateScreen[name] = initiatedScreen;
        }
      }
    });
  }

  registerComponent(component) {
    this.components.push(component);
  }

  getScreen(name) {
    return this.initiatedScreens[name];
  }

  getBareScreen(name) {
    const result = this.screens[_.findIndex(this.screens, { name })];
    return result;
  }
}
