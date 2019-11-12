import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import NavigationWrapper from 'react-native-navigation-wrapper';

export default class App extends Component {
  state = {
    status: 'Clicked: False',
  };

  static navigationOptions = {
    header: {
      title: 'hudn',
      backgroundColor: 'red',
      leftButtons: () => (
        <NavigationWrapper.ButtonBar>
          <NavigationWrapper.Button
            title="Test"
            color="blue"
            icon={NavigationWrapper.getIcon('rocket')}
            onPress={function() {
              this.setState({status: 'YEEEA'});
            }}
            onPressChange={{
              title: 'lol',
              icon: NavigationWrapper.getIcon('heart'),
              onPress() {
                this.setState({status: 'NOO'});
              },
            }}
          />
          <NavigationWrapper.Button
            title="Test"
            color="blue"
            icon={NavigationWrapper.getIcon('rocket')}
            onPress={function() {
              this.setState({status: 'YEEEA'});
            }}
            onPressChange={{
              title: 'lol',
              icon: NavigationWrapper.getIcon('heart'),
              onPress() {
                this.setState({status: 'NOO'});
              },
            }}
          />
        </NavigationWrapper.ButtonBar>
      ),
    },
  };

  render() {
    const {transition = 'TheTransition', width = 375} = this.props;
    const height = width === 375 ? 235 : (235 / 375) * width;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            NavigationWrapper.pushWithSharedElement({
              name: 'App',
              title: 'Push',
              props: {
                width: 250,
              },
              transition,
            })
          }>
          <NavigationWrapper.SharedElement transition={transition}>
            <Image
              source={require('./paris.jpg')}
              style={{
                width,
                height,
              }}
            />
          </NavigationWrapper.SharedElement>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationWrapper.push({
              name: 'App',
              title: 'Push',
            })
          }>
          <Text style={styles.welcome}>Push</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationWrapper.showModal({
              name: 'App',
              title: 'ShowModal',
            })
          }>
          <Text style={styles.welcome}>Show Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationWrapper.dismissModal()}>
          <Text style={styles.welcome}>dismiss Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationWrapper.pop()}>
          <Text style={styles.welcome}>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationWrapper.popWithSlide()}>
          <Text style={styles.welcome}>pop with slide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationWrapper.popToRoot()}>
          <Text style={styles.welcome}>pop to root</Text>
        </TouchableOpacity>
        <Text>{this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
