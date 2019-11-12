import NavigationWrapper from 'react-native-navigation-wrapper';
import ReactNavigation from 'react-native-navigation-wrapper/ReactNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import App from './App';

NavigationWrapper.setNavigation(ReactNavigation);

NavigationWrapper.addIcon('heart', {
  provider: Ionicons,
  name: 'md-heart',
  size: 20,
  color: 'white',
});

NavigationWrapper.addIcon('rocket', {
  provider: Ionicons,
  name: 'md-rocket',
  size: 20,
  color: 'white',
});

NavigationWrapper.registerScreen({
  name: 'App',
  Component: App,
});

NavigationWrapper.startStackApplication(
  'ReactNativeNavigationWrapperExample',
  'App',
);
// AppRegistry.registerComponent('ReactNativeNavigationWrapperExample', () => App);
