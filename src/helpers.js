import _ from 'lodash';
import Transformer from './Transformer';

export function transformButton(navBarButton) {
  const newButton = { ...navBarButton, onPressChange: {} };
  for (change in navBarButton.onPressChange) {
    if (navBarButton.onPressChange[change] !== undefined) {
      newButton.onPressChange[change] = navBarButton[change];
      newButton[change] = navBarButton.onPressChange[change];
    }
  }
  return newButton;
}

export function transformer(format, ...data) {
  return new Transformer(format, ...data).transform();
}

export function transformNavigationOptions(transformerFormat, ...dataSet) {
  let navigationOptions = {};
  let options = {};
  dataSet.forEach(data => {
    if (data !== undefined) {
      options = _.merge(options, data);
    }
  });
  Object.keys(transformerFormat).forEach(formatKey => {
    navigationOptions = {
      ...navigationOptions,
      ...transformer(transformerFormat[formatKey], options[formatKey])
    };
  });

  return navigationOptions;
}
