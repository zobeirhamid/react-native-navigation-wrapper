import { BackHandler } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import _ from "lodash";

class Navigator {
  navigators = [];

  activeNavigator = null;

  modalNavigators = [];

  activeModalNavigator = null;

  navigatorStack = [[]];

  modalNavigatorStack = [[]];

  setModalNavigator(modalNavigator) {
    if (modalNavigator != null) {
      this.modalNavigators.push(modalNavigator);
      this.activeModalNavigator = modalNavigator;
    } else {
      this.modalNavigators.pop();
      this.activeModalNavigator = this.modalNavigators[
        this.modalNavigators.length - 1
      ];
    }
  }

  setNavigator(navigator) {
    if (navigator != null) {
      this.activeNavigator = navigator;
      this.navigators.push(navigator);
    }
  }

  changeNavigator(index) {
    if (index > -1 && this.navigators.length > 0) {
      this.activeNavigator = this.navigators[index];
      return true;
    }
    return false;
  }

  pushScreen(
    navigator,
    navigatorStack,
    { name, props, options, title, transition }
  ) {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        backHandler.remove();
        this.popScreen(navigatorStack);
        return true;
      }
    );
    navigatorStack.push(navigator);
    navigator.dispatch(
      NavigationActions.navigate({
        routeName: name,
        key: Math.random().toString(),
        params: {
          ...props,
          title,
          transition
        }
      })
    );
  }

  push(params) {
    this.pushScreen(this.activeNavigator, this.navigatorStack, params);
  }

  pushWithSharedElement(params) {
    this.push({ ...params });
  }

  showModal(params) {
    this.pushScreen(
      this.activeModalNavigator,
      this.modalNavigatorStack,
      params
    );
  }

  popScreen(navigatorStack) {
    if (navigatorStack.length > 0) {
      navigatorStack[navigatorStack.length - 1].dispatch(
        NavigationActions.back()
      );
      navigatorStack.pop();
    }
  }

  pop() {
    this.popScreen(this.navigatorStack);
  }

  dismissModal() {
    this.popScreen(this.modalNavigatorStack);
  }

  popWithSlide() {
    this.pop();
  }

  popToRoot() {
    this.pop();
  }
}

export default new Navigator();
