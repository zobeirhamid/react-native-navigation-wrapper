import * as React from 'react';
import { View } from 'react-native';
import {
  transformNavigationOptions,
  transformButton,
  ScreenManager
} from 'react-native-navigation-wrapper';
import { Navigation } from 'react-native-navigation';
import {
  headerFormat,
  navigationButtonsFormat,
  tabBarFormat,
  statusBarFormat
} from './formats';

export default function Screen({ Component, options = {} }) {
  return class extends React.Component {
    navigationButtons = transformNavigationOptions(
      { header: navigationButtonsFormat },
      options,
      Component.navigationOptions
    );

    static options(passProps) {
      return transformNavigationOptions(
        {
          header: headerFormat,
          tabBar: tabBarFormat,
          statusBar: statusBarFormat
        },
        options,
        Component.navigationOptions,
        {
          header: { drawBehind: true },
          tabBar: { drawBehind: true },
          statusBar: { drawBehind: true, backgroundColor: 'transparent' }
        }
      );
    }

    constructor(props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
      const pressedButton = buttonId.split('-');
      const side = pressedButton[0];
      const index = parseInt(pressedButton[1]);
      const navBarButton = this.navigationButtons[side][index];
      navBarButton.onPress.bind(this.component)();
      this.navigationButtons[side][index] = transformButton(navBarButton);

      Navigation.mergeOptions(this.props.componentId, {
        topBar: this.navigationButtons
      });
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <Component
            {...this.props}
            ref={component => {
              this.component = component;
              ScreenManager.registerComponent(component);
            }}
          />
        </View>
      );
    }
  };
}
