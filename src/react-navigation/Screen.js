import * as React from 'react';
import {
  transformNavigationOptions,
  ScreenManager
} from 'react-native-navigation-wrapper';
import { headerFormat } from './formats';

export default function Screen({ Component, options = {} }) {
  return class extends React.Component {
    static navigationOptions = ({ navigation }) =>
      transformNavigationOptions({ header: headerFormat }, options, Component, {
        title: navigation.getParam('title')
      });

    render() {
      const { navigation } = this.props;
      const { params } = navigation.state;
      return (
        <Component
          {...params}
          {...this.props}
          {...this.props.screenProps || {}}
          {...(this.props.screenProps !== undefined &&
            this.props.screenProps.screenProps) ||
            {}}
          ref={component => ScreenManager.registerComponent(component)}
        />
      );
    }
  };
}
