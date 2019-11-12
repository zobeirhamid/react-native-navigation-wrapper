import { Navigation } from 'react-native-navigation';
import { ScreenManager } from 'react-native-navigation-wrapper';
import Screen from './Screen';
import SharedElement from './SharedElement';
import TabBarNavigation from './TabBarNavigation';
import StackNavigation from './StackNavigation';
import Navigator from './Navigator';

function registerApplication(appName, Component) {
  Navigation.setRoot({
    root: Component
  });
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
    initiateScreen: (name, screenComponent) => {
      Navigation.registerComponent(name, () =>
        ScreenManager.applyProviders(screenComponent)
      );
    },
    Screen,
    SharedElement,
    registerApplication,
    createTabRoot: TabBarNavigation,
    createStackRoot: StackNavigation
  },
  handler
);
