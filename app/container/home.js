import React, { Component } from 'react'
import {
  Dimensions,	
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,	
  Text,
  Alert,
  ListView,
  Image,
  ScrollView,
  View
} from 'react-native'
import Swiper from 'react-native-swiper';
import NavigationBar from '../item/NavigationBar.js';
import ListEndTag from '../item/listitem/EndTag.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMenuList1,getMenuList2} from '../service/homeStore.js';
import {refactorArray} from '../util/arrayUtil.js';
import Toast from '@remobile/react-native-toast';
import {getOrderList} from '../service/orderStore.js';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageHeight=240;

var images=[
    require('../image/index1.jpeg'),
    require('../image/index2.jpeg'),
    require('../image/index3.jpeg'),
    require('../image/index4.jpeg'),
    require('../image/index5.jpeg')
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: windowWidth,
    height: imageHeight
  },
   header_backdrop: {
		position:'absolute',
		left:0,
		right:0,
		bottom: 0,
		top: 0,
		backgroundColor: 'rgba( 0, 0, 0, 0.3)',
	    height: 200
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
		width: windowWidth
	},
	foreground:{
      	height: 200,
	  	paddingTop: 40
    },
     listView: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    margin: 5
  },
  itemText: {
    color: '#79767C',
    fontSize: 18
  },
  itemContext: {
    color: '#DDDDDD',
    fontSize: 14
  },
  itemT: {
    color: '#FFC0CB',
    fontSize: 16
  },
  itemImage: {
    width: 120,
    height: 100,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  }
});

class HomeContainer  extends Component {
  constructor (props) {
    super(props);
    this.state = {
        isRefreshing:true,
        total:0,
        loaded:0,
        page:1,
        size:5,
        rowData:[]
    };
    
  }
  componentDidMount () {
   	let result=getOrderList(this.state.page,this.state.size);
   
     this.setState({isRefreshing: false,total:result.total,loaded:result.rows.length,rowData:result.rows});
  }

  renderSpacer(){
		return (
			<View style={ styles.spacer }></View>
		)
	}

  onItemPress(item){
		      Toast.showShortBottom("你点击了:"+item.title);
	}

	_onPress(data) {
    //跳转
    Alert.alert('提醒','确定把[红烧茄子]加入购物车?',[ 
              {text: '确定', onPress: () => Toast.showShortBottom("已加入购物车")},
              {text: '取消'}]);
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
				</View>
            )
    }

	renderContent1(){
        let list= refactorArray(getMenuList1(),5);
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

	renderContent2(){
        let list= refactorArray(getMenuList2(),5);
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

	renderRow(rowData, sectionID, rowID) {
	    return (
	      <TouchableOpacity key={rowID}  onPress={() => {this._onPress(rowData)}}>
	        <View style={styles.itemView}>
	           <Image style={styles.itemImage}  source={require('../image/timg.jpeg')}/>
	           <View style={{flexDirection: 'column',width:160,margin: 5}}>
	              <Text style={styles.itemText}>红烧茄子</Text>
	              <Text style={styles.itemContext}>   本产品由著名大师,毛哥所做,偏辣！</Text>
	              <View  style={{height:10}}/>

	              <Text style={styles.itemT}>已收藏(60)</Text>

	           </View>
	           <View style={{alignItems: 'center',flexDirection: 'row',padding: 15}}>
	                <Text style={[styles.itemText]}>4元</Text>
	           </View>

	          
	        </View>
	      </TouchableOpacity>
	    );
  	}

   _loadMoreData(){

    if(this.state.loaded<this.state.total){  
      let nextPage=this.state.page+1;
      let result=getOrderList(nextPage,this.state.size);
      this.setState({page:nextPage,total:result.total,loaded:this.state.loaded+result.rows.length,rowData:this.state.rowData.concat(result.rows)});
    }
  }


renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={rowID} style={styles.separatorLine}/>
    );
  }

 




  render() {
  	    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  	    let {onMenuPress}=this.props;
        return (
			        	<View style={styles.container}>
				    	    <NavigationBar
				    	        onRightPressed={onMenuPress}
				        		navigationBarProps={{
				      						leftButtonImage: require('../image/search_min.png'),
				      						rightButtonImage: require('../image/shopping.png'),
				     						title: '首页'
				    			}} />
				    	    <ScrollView>
				    	       <Swiper height={imageHeight} autoplay={true} autoplayTimeout={3}>
			                		{this.renderImg()}
			            		</Swiper>

			            		<Swiper height={230}>
			                		{ this.renderContent1() }
			                		{ this.renderContent2() }
			            		</Swiper>
			            		{ this.renderSpacer() }
			            		<View style={[ styles.p_a_4, styles.flexRow, styles.flexItemsMiddle, styles.flexItemsBetween, styles.row,styles.flexItemsCenter ]}>
									<Text style={[styles.text_gray, styles.font_xs ]}>
										--猜你喜欢--
									</Text>	
								</View>
								<ListView 
									dataSource={ds.cloneWithRows(this.state.rowData)} 
									renderRow={this.renderRow.bind(this)}
			         				enableEmptySections={true}
			          				onEndReached={ this._loadMoreData.bind(this) }
			         				onEndReachedThreshold={10}
			          				renderSeparator={this.renderSeparator}
			          				renderFooter={()=>{ return <ListEndTag  isLoadAll={this.state.loaded==this.state.total} />}}        
						  		 />	
			                </ScrollView>		    					
			    		</View>			            
        );
   }
  
   renderImg(){
        var imageViews=[];
        for(var i=0;i<images.length;i++){
            imageViews.push(
                <Image
                    key={i}
                    style={[{flex:1},styles.image]}
                    source={images[i]}
                    />
            );
        }
        return imageViews;
    }
}

export default HomeContainer;
