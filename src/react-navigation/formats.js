import React from 'react';
import ButtonBar from './components/ButtonBar';

export const tabBarFormat = {
  backgroundColor: { style: 'backgroundColor' },
  labelColor: 'inactiveTintColor',
  activeLabelColor: 'activeTintColor',
  hideLabels: hideLabels => ['showLabel', !hideLabels]
};

export const tabFormat = {
  label: 'tabBarLabel',
  icon: Icon => [
    'tabBarIcon',
    ({ tintColor }) => Icon.getComponent({ color: tintColor })
  ]
};

export const topBarFormat = {
  backgroundColor: {
    background: {
      color: 'backgroundColor'
    }
  }
};

export const headerFormat = {
  visible: bool => ['header', bool ? undefined : null],
  backgroundColor: { headerStyle: 'backgroundColor' },
  title: 'title',
  rightButtons: Component => [
    'headerRight',
    React.createElement(ButtonBar, Component().props)
  ],
  leftButtons: Component => [
    'headerLeft',
    React.createElement(ButtonBar, Component().props)
  ]
};

export const buttonFormat = {
  title: 'title',
  color: 'color',
  icon: 'icon',
  onPress: 'onPress',
  onPressChange: 'onPressChange'
};
