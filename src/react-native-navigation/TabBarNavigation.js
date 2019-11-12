import { transformer } from 'react-native-navigation-wrapper';
import { tabFormat, tabBarFormat } from './formats';
import StackNavigation from './StackNavigation';

export default function TabBarNavigation(tabBarOptions, tabContainerFunction) {
  const children = tabContainerFunction(tabOptions =>
    StackNavigation(
      tabOptions.route,
      transformer(tabFormat, tabBarOptions, tabOptions)
    )
  );
  return {
    bottomTabs: {
      children,
      options: transformer(tabBarFormat, tabBarOptions)
    }
  };
}
