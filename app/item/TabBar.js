/**
 * Created by lipeiwei on 16/10/2.
 * 自定义tabbar
 */

import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class TabBar extends React.Component {


  


  constructor(props) {
    super(props);
    
  }
  
  render(){
   return(<View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
    </View>);
  }

  renderTabOption(tab, i) {
  	  const color = this.props.activeTab == i? "#6B8E23" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
	  return (
	    <TouchableOpacity key={"top"+i} onPress={()=>this.props.goToPage(i)} style={styles.tab}>
	        <View key={"view"+i} style={styles.tabItem}>
	            <Icon key={"icon"+i}
	                name={this.props.tabIconNames[i]}  // 图标
	                size={30}
	                color={color}/>
	            <Text  key={"text"+i} style={{color: color}}>
	                {this.props.tabNames[i]}
	            </Text>
	        </View>
	    </TouchableOpacity>
	   );
   };
}
TabBar.propTypes = {
		goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合
		tabNames: React.PropTypes.array, // 保存Tab名称
		tabIconNames: React.PropTypes.array, // 保存Tab图标
	}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		height: 50,
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export default TabBar;


