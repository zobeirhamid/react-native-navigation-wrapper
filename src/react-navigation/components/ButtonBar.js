import React from 'react';
import { View } from 'react-native';
import { transformer } from 'react-native-navigation-wrapper';
import Button from './Button';
import { buttonFormat } from '../formats';

export default function ButtonBar({ children }) {
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
      {React.Children.map(children, ({ props }) => (
        <Button {...transformer(buttonFormat, props)} />
      ))}
    </View>
  );
}
