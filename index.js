export {
  transformer,
  transformButton,
  transformNavigationOptions
} from './src/helpers';
import ReactNativeNavigationWrapper from './src/ReactNativeNavigationWrapper';

const Navigation = new ReactNativeNavigationWrapper();

export const { ScreenManager, IconManager } = Navigation;

const handler = {
  get(obj, prop) {
    if (prop in obj || obj.hasOwnProperty(prop)) {
      return obj[prop];
    }

    const navigation = Navigation.getNavigation();
    if (navigation !== null && navigation.hasOwnProperty(prop)) {
      return navigation[prop];
    }

    const screenManager = Navigation.getScreenManager();
    if (
      (screenManager !== null && prop in screenManager) ||
      screenManager.hasOwnProperty(prop)
    ) {
      return screenManager[prop];
    }

    const iconManager = Navigation.getIconManager();
    if (
      (iconManager !== null && prop in iconManager) ||
      iconManager.hasOwnProperty(prop)
    ) {
      return iconManager[prop];
    }

    const firstCharacter = prop.charAt(0);
    if (firstCharacter === firstCharacter.toUpperCase()) {
      return props => props;
    }

    return navigation[prop];
  }
};

export default new Proxy(Navigation, handler);
