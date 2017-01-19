/**
 * Created by lipeiwei on 16/10/2.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';

import NavigationBar from '../item/NavigationBar.js';
import navigator from '../route.js';
import Toast from '@remobile/react-native-toast';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 10
  },
  topViewContainer: {
    //怎么实现阴影,模糊边框
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: 10
  },
  contentImage: {
    height: 250,
    width:335
  },
  pictureInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pictureInfoText: {
    fontSize: 12,
    color: '#79767C'
  },
  content: {
    marginTop: 20,
    fontSize: 15,
    color: '#443046'
  },
  date: {
    marginTop: 30,
    fontSize: 14,
    color: '#79767C',
    alignSelf: 'flex-end'
  },
  bottomViewContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  smallIcon: {
    width: 45,
    height: 45,
  },
  bottomText: {
    fontSize: 14,
    color: '#79767C'
  },
  shareImage: {
    marginLeft: 10
  }
});

class FoodContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       diaryImg:require('../image/diary.png'),
       diaryFlag:false,
       laudImg:require('../image/laud.png'),
       laudFlag:false,
       num:this.props.data.goodnum
    };
  }

  storeFood() {  
    if(this.state.diaryFlag){
      this.setState({  diaryImg:require('../image/diary.png'),diaryFlag:false});
      Toast.showShortBottom('已取消收藏');
    }else{
      this.setState({  diaryImg:require('../image/diary_pressed.png'),diaryFlag:true});
      Toast.showShortBottom('已收藏');
    }
  }

  
  goodFood() {  
    if(this.state.laudFlag){
      this.setState({  laudImg:require('../image/laud.png'),laudFlag:false,num:this.state.num-1});

    }else{
      this.setState({  laudImg:require('../image/laud_selected.png'),laudFlag:true,num:this.state.num+1});
    }
  }

  shareFood() {
     Toast.showShortBottom('已分享');
  }

  render() {
    const {data}=this.props;
    return (
       <View style={styles.container}>
          <NavigationBar
            onLeftPressed={()=>{ navigator.pop()}}
            navigationBarProps={{
                  hideRightButton: true,
                  leftButtonImage: require('../image/return.png'),
                  title: data.name
          }} />
        <ScrollView style={styles.scrollView}>
         <View style={styles.topViewContainer}>
              <Image style={styles.contentImage} source={require('../image/timg.jpeg')}/>
            <View style={styles.pictureInfoContainer}>
              <Text style={styles.pictureInfoText}>{data.name}</Text>
              <Text style={styles.pictureInfoText}>{data.fee}元</Text>
            </View>
            <Text style={styles.content}>{data.content}</Text>
            <Text style={styles.date}>{data.fav}</Text>
          </View>
          <View style={styles.bottomViewContainer}>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} activeOpacity={1} onPress={this.storeFood.bind(this)} >
                  <Image style={styles.smallIcon} source={this.state.diaryImg}/>
                  <Text style={styles.bottomText}>{data.type}</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} activeOpacity={1}  onPress={this.goodFood.bind(this)}>
                  <Image style={styles.smallIcon} source={this.state.laudImg}/>
                  <Text style={styles.bottomText}>{this.state.num}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareImage} activeOpacity={0} onPress={this.shareFood}>
                  <Image style={styles.smallIcon} resizeMode="contain" source={require('../image/share_image.png')}/>
                </TouchableOpacity>
              </View>

            
           
          </View>
        </ScrollView>
       </View>
      
    );
  }


}



export default FoodContainer;












