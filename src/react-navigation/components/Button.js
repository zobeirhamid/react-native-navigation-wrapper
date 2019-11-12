import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import {
  transformButton,
  ScreenManager
} from 'react-native-navigation-wrapper';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    const { title, color, icon, onPress, onPressChange } = this.props;
    this.state = {
      title,
      color,
      icon,
      onPress,
      onPressChange,
      screenId: ScreenManager.getActiveScreenId()
    };
  }

  onPress() {
    const { onPress, screenId } = this.state;
    if (onPress) {
      onPress.bind(ScreenManager.getComponentById(screenId))();
      this.setState(transformButton(this.state));
    }
  }

  render() {
    const { title, color, icon } = this.state;
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <View style={{ marginHorizontal: 10 }}>
          {icon !== undefined ? (
            icon.getComponent({ color })
          ) : (
            <Text>{title}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
