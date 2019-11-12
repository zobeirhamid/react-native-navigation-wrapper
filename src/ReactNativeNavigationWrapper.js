import IconManager from "./IconManager";
import ScreenManager from "./ScreenManager";

export default class ReactNativeNavigationWrapper {
  navigation = null;

  IconManager = new IconManager();

  ScreenManager = new ScreenManager();

  bootstrap = [];

  startApplication() {
    return new Promise((resolve, reject) => {
      this.IconManager.loadIcons().then(() => {
        this.ScreenManager.initiateScreens();
        Promise.all(this.bootstrap).then(() => {
          resolve();
        });
      });
    });
  }

  addBootstrap(bootstrap) {
    this.bootstrap.push(bootstrap);
  }

  iterateThroughTabs(tabs) {
    return tabCallback =>
      tabs.map((tab, index) => tabCallback(tab.props, index));
  }

  async startTabBarApplication(name, TabsContainer) {
    await this.startApplication();
    const TabsComponent = TabsContainer();
    const Root = this.navigation.createTabRoot(
      TabsComponent.props,
      this.iterateThroughTabs(TabsComponent.props.children)
    );
    this.navigation.registerApplication(name, Root);
  }

  async startStackApplication(name, screen) {
    await this.startApplication();
    const Root = this.navigation.createStackRoot(screen);
    this.navigation.registerApplication(name, Root);
  }

  setNavigation(navigation) {
    this.navigation = navigation;
    this.ScreenManager.setNavigation(this.navigation);
  }

  getNavigation() {
    return this.navigation;
  }

  getScreenManager() {
    return this.ScreenManager;
  }

  getIconManager() {
    return this.IconManager;
  }
}
