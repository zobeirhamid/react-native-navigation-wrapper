import React from 'react';
import { transformer } from 'react-native-navigation-wrapper';

export const statusBarFormat = {
  drawBehind: { statusBar: 'drawBehind' },
  backgroundColor: { statusBar: 'backgroundColor' }
};

export const buttonFormat = {
  title: 'text',
  icon: Icon => ['icon', Icon.getImageSource()],
  color: 'color',
  onPress: 'onPress',
  onPressChange: changes => [
    'onPressChange',
    transformer(buttonFormat, changes)
  ]
};

export const tabBarFormat = {
  backgroundColor: { bottomTabs: 'backgroundColor' },
  hideLabels: {
    bottomTabs: hideLabels => [
      'titleDisplayMode',
      hideLabels ? 'alwaysHide' : 'alwaysShow'
    ]
  },
  visible: { bottomTabs: 'visible' },
  drawBehind: { bottomTabs: 'drawBehind' }
};

export const topBarFormat = {
  backgroundColor: {
    background: {
      color: 'backgroundColor'
    }
  }
};

export const navigationButtonsFormat = {
  rightButtons: ButtonBar => [
    'rightButtons',
    React.Children.map(ButtonBar().props.children, (Button, index) => ({
      ...transformer(buttonFormat, Button.props),
      id: `rightButtons-${index}`
    }))
  ],
  leftButtons: ButtonBar => [
    'leftButtons',
    React.Children.map(ButtonBar().props.children, (Button, index) => ({
      ...transformer(buttonFormat, Button.props),
      id: `leftButtons-${index}`
    }))
  ]
};

export const headerFormat = {
  drawBehind: { topBar: 'drawBehind' },
  visible: { topBar: 'visible' },
  backgroundColor: { topBar: { background: 'color' } },
  title: { topBar: { title: 'text' } },
  rightButtons: {
    topBar: ButtonBar => [
      'rightButtons',
      React.Children.map(ButtonBar().props.children, (Button, index) => ({
        ...transformer(buttonFormat, Button.props),
        id: `rightButtons-${index}`
      }))
    ]
  },
  leftButtons: {
    topBar: ButtonBar => [
      'leftButtons',
      React.Children.map(ButtonBar().props.children, (Button, index) => ({
        ...transformer(buttonFormat, Button.props),
        id: `leftButtons-${index}`
      }))
    ]
  }
};

export const tabFormat = {
  label: { bottomTab: 'text' },
  labelColor: { bottomTab: 'textColor' },
  activeLabelColor: { bottomTab: 'selectedTextColor' },
  iconColor: { bottomTab: 'iconColor' },
  activeIconColor: { bottomTab: 'selectedIconColor' },
  icon: { bottomTab: Icon => ['icon', Icon.getImageSource()] },
  hideLabels: {
    bottomTab: hideLabels => [
      'iconInsets',
      hideLabels ? { top: 5, bottom: -5 } : {}
    ]
  }
};
