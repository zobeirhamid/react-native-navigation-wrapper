import * as React from "react";
import * as MagicMove from "react-native-magic-move";

class SharedElement extends React.Component {
  render() {
    const { children, transition } = this.props;
    if (transition !== undefined) {
      return (
        <MagicMove.View id={transition} useNativeDriver>
          {children}
          {false && React.cloneElement(children, { resizeMode: "stretch" })}
        </MagicMove.View>
      );
    }
    return children;
  }
}

export default SharedElement;
