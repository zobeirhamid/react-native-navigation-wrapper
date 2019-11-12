import { Navigation } from 'react-native-navigation';
import StackNavigation from './StackNavigation';

function transformTransitionToAnimation(transition) {
  function createAnimation(element) {
    return {
      type: 'sharedElement',
      fromId: element,
      toId: element + 1,
      startDelay: 0,
      springVelocity: 0.2,
      duration: 0.5
    };
  }
  if (typeof transition === 'object') {
    const result = Object.keys(transition)
      .filter(key => transition[key] !== undefined)
      .map(key => createAnimation(transition[key]));
    return result;
  }
  return [createAnimation(transition)];
}

function transformTransitionToNextTransition(transition) {
  if (typeof transition === 'object') {
    const transformedTransition = {};
    Object.keys(transition)
      .filter(key => transition[key] !== undefined)
      .forEach(key => {
        transformedTransition[key] = transition[key] + 1;
      });
    return transformedTransition;
  }
  return transition + 1;
}

class Navigator {
  componentIds = [];

  currentTabComponentId = componentId => {
    this.currentTabComponentId = componentId;
  };

  modalsCount = [];

  onNewScreenAppeared(componentId) {
    if (typeof this.currentTabComponentId === 'function') {
      this.currentTabComponentId(componentId);
    }
    this.componentIds.push(componentId);
  }

  onSelectTab() {
    this.currentTabComponentId = componentId => {
      this.currentTabComponentId = componentId;
    };
  }

  push({ name, props, options, title }) {
    Navigation.push(this.componentIds[this.componentIds.length - 1], {
      component: {
        name,
        passProps: { ...props, title },
        options
      }
    });
  }

  pushWithSharedElement({ name, props, transition, title }) {
    this.push({
      name,
      props: {
        ...props,
        transition: transformTransitionToNextTransition(transition)
      },
      title,
      options: {
        customTransition: {
          animations: transformTransitionToAnimation(transition),
          duration: 0.8
        }
      }
    });
  }

  showModal({ name, props, options, title }) {
    Navigation.showModal(StackNavigation(name, options, { ...props, title }));
    this.modalsCount++;
  }

  dismissModal() {
    if (this.componentIds.length > 1 && this.modalsCount > 0) {
      Navigation.dismissModal(this.componentIds[this.componentIds.length - 1]);
      this.componentIds.pop();
      this.modalsCount--;
    }
  }

  pop() {
    if (this.componentIds.length > 1) {
      Navigation.pop(this.componentIds[this.componentIds.length - 1]);
      this.componentIds.pop();
    }
  }

  popWithSlide() {
    if (this.componentIds.length > 1) {
      const temporaryComponentId = this.componentIds[
        this.componentIds.length - 2
      ];
      this.componentIds.pop();
      this.componentIds.pop();

      Navigation.popTo(temporaryComponentId);
    }
  }

  popToRoot() {
    if (this.componentIds.length > 1) {
      const temporaryComponentId = this.componentIds[
        this.componentIds.length - 1
      ];
      this.componentIds.push(this.currentTabComponentId);
      Navigation.popToRoot(temporaryComponentId);
    }
  }
}
const InitiatedNavigator = new Navigator();

Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
  InitiatedNavigator.onNewScreenAppeared(componentId);
});

Navigation.events().registerBottomTabSelectedListener(() => {
  InitiatedNavigator.onSelectTab();
});

export default InitiatedNavigator;
