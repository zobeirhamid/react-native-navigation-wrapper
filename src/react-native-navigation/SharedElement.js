import * as React from 'react';
import { Navigation } from 'react-native-navigation';

class SharedElement extends React.Component {
  render() {
    const { children, transition } = this.props;
    if (transition !== undefined) {
      return (
        <Navigation.Element elementId={transition} resizeMode="stretch">
          {React.cloneElement(children, { resizeMode: 'stretch' })}
        </Navigation.Element>
      );
    }
    return children;
  }
}

export default SharedElement;
