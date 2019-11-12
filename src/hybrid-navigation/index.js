import { Navigation as ReactNativeNavigation } from 'react-native-navigation';
import TabBarNavigation from './TabBarNavigation';

function registerApplication(appName, Root) {
  ReactNativeNavigation.setRoot({
    root: Root
  });
}

export default (Tab, Stack) => {
  let changeNavigator = false;
  const handler = {
    get(obj, prop) {
      if (!changeNavigator) {
        changeNavigator = Stack.changeNavigator(0);
      }
      if (prop === 'registerApplication') {
        return registerApplication;
      }
      if (prop === 'createTabRoot') {
        ReactNativeNavigation.events().registerBottomTabSelectedListener(
          ({ selectedTabIndex, unselectedTabIndex }) => {
            Stack.changeNavigator(selectedTabIndex);
          }
        );
        return TabBarNavigation(Tab, Stack);
      }
      return obj[prop];
    }
  };
  return new Proxy(Stack, handler);
};
