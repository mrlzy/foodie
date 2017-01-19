import React, { Component } from 'react';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMenuList} from '../service/menuStore.js';
import {refactorArray} from '../util/arrayUtil.js';
import Toast from '@remobile/react-native-toast';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ListView,
  TouchableHighlight,
  RefreshControl,
  View
} from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header_backdrop: {
		position:'absolute',
		left:0,
		right:0,
		bottom: 0,
		top: 0,
		backgroundColor: 'rgba( 0, 0, 0, 0.3)',
	    height: 200
	},
	cover:{
		top: 0,
		height: 65,
		width: width,
	},
	header_img: {
		width: width,
		height: height
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30
	},
	avatar_mini: {
		width: 30,
		height: 30,
		borderRadius: 15
	},
	p_a_3: {
		padding: 15
	},
	p_a_4: {
		padding: 20
	},
	m_y_2:{
		marginVertical: 10
	},
	m_r_1:{
		marginRight: 5
	},
	m_b_1:{
		marginBottom: 5
	},
	m_b_2:{
		marginBottom: 10
	},
	font_lg: {
		fontSize: 20
	},
	font_sm: {
		fontSize:16
	},
	font_xs: {
		fontSize: 14
	},
	flexColumn:{
		flexDirection: 'column'
	},
	flexItemsMiddle:{
		alignItems: 'center'
	},
	flexItemsBetween: {
		justifyContent:'space-between'
	},
	flexRow:{
		flexDirection: 'row'
	},
	flexItemsCenter: {
		justifyContent: 'center'
	},
	flexItemsBottom:{
		alignItems: 'flex-end'
	},
	flex_1:{
		flex: 1
	},
	text_white:{
		color: 'rgba(255, 255, 255, 1)'
	},
	text_gray:{
		color: 'rgba(0, 0, 0, 0.6)'
	},	
	text_dark: {
		color: 'rgba(0, 0, 0, 0.7)'
	},
	container: {
		top:0,
		height: 65,
		width: width,
		paddingVertical: 12,
		paddingHorizontal: 15
	},
	pos_absolute: {
		position: 'absolute',
		left: 0,
		right: 0
	},
	background_transparent: {
		backgroundColor: "transparent"
	},
	spacer: {
		height: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.02)'
	},
	row:{
		width: width
	},
	foreground:{
      	height: 200,
	  	paddingTop: 40
    }
});

class UserContainer extends React.Component {



	renderParallaxBackground(postInfo){
		return (
			<View>
	            <Image 
					resizeMode="cover"
		            style={ [styles.header_img ] } 
		            source={ require('../image/header.jpeg') }
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Image>		
	            <View style={ [ styles.header_backdrop ] }/>
	        </View>
		)
	}

	renderParallaxForeground(){
		return (
			<View style = { [ styles.flexColumn, styles.flexItemsMiddle, styles.flexItemsCenter, styles.foreground ] }> 
				<Image 
					style={ [ styles.avatar, styles.m_y_2 ] } 
		            source={ require('../image/user.jpg') }/>
				<Text style={[styles.text_white, styles.font_lg, styles.m_b_1 ]}>
					mrlzy
				</Text>
            </View> 
		)
	}

	renderParallaxStickyHeader(){
		return (
			<View style={ [styles.flexRow, styles.flexItemsBetween, styles.flexItemsBottom, styles.pos_absolute, styles.container] }>
				<Image 	style={ [styles.pos_absolute, styles.cover] }  source={ require('../image/header.jpeg') }/>
				
				<View style={ [ styles.pos_absolute,styles.flexItemsBottom,styles.flexRow,{paddingTop:30,paddingLeft:30}] }>
					<Image 
						source={ require('../image/user.jpg') } 
						style={ [styles.avatar_mini,styles.m_r_1]}/>

					<Text style={ [styles.text_white,styles.font_sm, styles.background_transparent] }>
						mrlzy
					</Text>	
				</View>
            </View> 
		);
	}

	renderSpacer(){
		return (
			<View style={ styles.spacer }></View>
		)
	}

	onItemPress(item){
		      Toast.showShortBottom("你点击了:"+item.title);

	}

	renderItem(item, index){
		if(item.id){
			return (
				<TouchableHighlight
					key = {item.id}
					onPress={()=> this.onItemPress(item) } 
					style={[ styles.flex_1, styles.p_a_3 ]}
					underlayColor ="rgba(0, 0, 0, 0.05)"
					>
					<View style={[ styles.flexColumn, styles.flexItemsMiddle, styles.flexItemsCenter ]}>
						<Icon    name={ item.icon } 
							size={ 36 } 
							color = { item.color }
							style={[ styles.m_b_2, styles.background_transparent ]}/>
						<Text    style={[styles.font_xs, styles.text_dark]}>
							{ item.title }
						</Text>
					</View>
				</TouchableHighlight>	
			)
	    }else{
	    	return (
	    		<View key = {"d"+index} style={[ styles.flex_1, styles.p_a_3 ]}>		
				</View>
			)
	    }

	}

    renderLineItems(lineItems,i){
    	return (
    	       <View key = {"line"+i} >
	    			<View  style={[ styles.flexRow, styles.row ]}>
						{
							lineItems.map((nav, index)=>{
								return this.renderItem(nav, index);
							})
						}
					</View>
					  { this.renderSpacer() }
				</View>
            )
    }

	renderContent(){
        let list= refactorArray(getMenuList(),3);
        let last_index=list.length-1;
        let len=list[last_index].length;
        
        for(let i=0;i<(3-len);i++){
        	list[last_index].push({});
        }
        
		return (
			<View>
			    {
					list.map((nav, index)=>{
							return this.renderLineItems(nav, index);
					})
			    }
			</View>
		)
	}

	render() {
	  return (
	    <ParallaxScrollView
	      backgroundColor="rgba(0, 0, 0, 0.7)"
	      stickyHeaderHeight={65}
	      parallaxHeaderHeight={200}
	      renderBackground={() => this.renderParallaxBackground()}
	      renderForeground={() => this.renderParallaxForeground()}
	      renderStickyHeader={() => this.renderParallaxStickyHeader()}
		>
	        <View style={[ styles.p_a_4, styles.flexRow, styles.flexItemsMiddle, styles.flexItemsBetween, styles.row ]}>
					<Text style={[styles.text_gray, styles.font_xs ]}>
						账号：mrlzy
					</Text>
					<Text style={[styles.text_gray, styles.font_xs ]}>
						吃龄：3年
					</Text>
				
			</View>
			{this.renderSpacer}
			{ this.renderContent() }

	    </ParallaxScrollView>
	  );
    }
}

export default UserContainer;
