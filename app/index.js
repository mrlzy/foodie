
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import {configureScene,renderScene} from './route.js';
export default class App extends Component {
   constructor(props) {
     super(props);
   }
   render() {
    return (
     <Navigator
          style={styles.navigator}
          configureScene={configureScene}
          renderScene={renderScene}
          initialRoute={{
            name: 'LoginContainer',//MainContainer
          }}/>
    );
  }

};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'white'
  }

});