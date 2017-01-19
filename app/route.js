
import MainContainer from './container/main.js';
import LoginContainer from './container/login.js';
import OrderPicContainer from './container/orderpic.js';
import FoodContainer from './container/food.js';



import React from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';


const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  }
});

const routeMap = new Map();

routeMap.set('MainContainer', {
  component: MainContainer
});

routeMap.set('LoginContainer', {
  component: LoginContainer
});

routeMap.set('OrderPicContainer', {
  component: OrderPicContainer
});

routeMap.set('FoodContainer', {
  component: FoodContainer
});



let navigator;

function registerNavigator(tempNavigator) {
  if (navigator) {
    return;
  }
  navigator = tempNavigator;
}

let Navigator_={
    push(route){
    	navigator.push(route);
    },
    resetTo(route){
      navigator.resetTo(route);
    },
    pop(){
      navigator.pop();
    }
}

export default Navigator_;



export function configureScene(route) {
    let sceneAnimation = routeMap.get(route.name).sceneAnimation;
    if (sceneAnimation) {
      return sceneAnimation;
    }
    //默认
    return Navigator.SceneConfigs.FloatFromRight;
 }

export function renderScene(route, nav) {
    registerNavigator(nav);
    //Each component name should start with an uppercase letter
    //jsx中的组件都得是大写字母开头, 否则将报错, expected a component class, got [object Object]
    let Component = routeMap.get(route.name).component;
    if (!Component) {
      return (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>您所启动的Component未在routeMap中注册</Text>
        </View>
      );
    }
    return (
      <Component {...route}/>
    );
  } 



