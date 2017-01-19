import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer';
import TabBar from '../item/TabBar';
import HomeContainer from './home.js';
import RecommendContainer from './recommend.js';
import OrderContainer from './order.js';
import UserContainer from './user.js';
import ShoppingCart from './shopping.js';


import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      tabNames: ['首页', '推荐', '订单', '我的'],
      tabIconNames: ['ios-home', 'ios-albums', 'ios-paper', 'ios-person'],
    };
  }


 closeDrawer(){
    this._drawer.close();
  };

  openDrawer(){
      this._drawer &&this._drawer.open();
  };
  
  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
    return (
              <Drawer
                ref={(ref) => this._drawer = ref}
                openDrawerOffset = { 50 }
                closedDrawerOffset={() => 0}
                acceptTap = { true }
                content={  <ShoppingCart closeDrawer={this.closeDrawer} /> }  >
                  <ScrollableTabView
                      renderTabBar={() => <TabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                      tabBarPosition='bottom'>
                      <HomeContainer onMenuPress={this.openDrawer}/>
                      <RecommendContainer onMenuPress={this.openDrawer} />  
                      <OrderContainer />
                      <UserContainer />
                  </ScrollableTabView>
              </Drawer>    
        );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    flex: 1
  }
});

export default MainContainer;