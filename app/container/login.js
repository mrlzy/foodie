import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import navigator from '../route.js';

import EditView from '../item/EditView.js';
export default class LoginContainer extends Component {
  render() {
    return (
    	<View style={LoginStyles.loginview}>
     		<View   style={{flexDirection: 'row',height:100,marginTop:40,justifyContent: 'center',alignItems: 'flex-start'}}>
       			<Image   source={require('../image/logo.jpeg')}/>
     		</View>
     		<View style={{marginTop:40}}>
       			<EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
        												this.userName = text;
        		}}/>
		       <EditView name='输入密码' onChangeText={(text) => {
		            this.password = text;
		        }}/>
		        <TouchableOpacity  style={LoginStyles.loginTextView}  onPress={this.login}>
			        <Text style={LoginStyles.loginText} >
			            登录
			        </Text>
			     </TouchableOpacity>
        		<Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
      		</View>
      	</View>	
    );
  }
   
  login(){
      navigator.resetTo({name:'MainContainer'});
  } 


}

const LoginStyles = StyleSheet.create({
  loginText: {
    color: '#ffffff',
     fontWeight: 'bold',
     width:30,
  },
  loginTextView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#3281DD',
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },	
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
  },
});