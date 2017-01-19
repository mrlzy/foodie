import React from 'react';
import NavigationBar from '../item/NavigationBar.js';
import ListEndTag from '../item/listitem/EndTag.js';
import {getOrderList} from '../service/orderStore.js';
import navigator from '../route.js';
import Toast from '@remobile/react-native-toast';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ListView,
  RefreshControl,
  View
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

class RecommendContainer extends React.Component {

  constructor(props) {
    super(props);
    this._onRefresh = this._onRefresh.bind(this);

    this.state = {
        isRefreshing:true,
        total:0,
        loaded:0,
        page:1,
        size:20,
        rowData:[]
    };
  }

  componentDidMount() {

     let result=getOrderList(this.state.page,this.state.size);
   
     this.setState({isRefreshing: false,total:result.total,loaded:result.rows.length,rowData:result.rows});


  }

  _loadMoreData(){

    if(this.state.loaded<this.state.total){  
      let nextPage=this.state.page+1;
      let result=getOrderList(nextPage,this.state.size);
      this.setState({page:nextPage,total:result.total,loaded:this.state.loaded+result.rows.length,rowData:this.state.rowData.concat(result.rows)});
    }
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
	     						title: '推荐'
	    			}} />
    		<ListView style={ styles.listViewContent } 
					dataSource={ds.cloneWithRows(this.state.rowData)} 
					renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
          onEndReached={ this._loadMoreData.bind(this) }
          onEndReachedThreshold={10}
          renderSeparator={this.renderSeparator}
          renderFooter={()=>{ return <ListEndTag  isLoadAll={this.state.loaded==this.state.total} />}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="gray"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="gray"/>
            }
			   />	
    	 </View>
      
    );
  }

renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={rowID} style={styles.separatorLine}/>
    );
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

  _onPress(data) {
    //跳转
    Alert.alert('提醒','确定把[红烧茄子]加入购物车?',[ 
              {text: '确定', onPress: () => Toast.showShortBottom("已加入购物车")},
              {text: '取消'}]);
  }
  
  _onRefresh() {
    this.setState({isRefreshing: true});
    let result=getOrderList(1,this.state.size);
    setTimeout(() => {
           this.setState({page:1,isRefreshing: false,total:result.total,loaded:result.rows.length,rowData:result.rows});
    }, 5000);
  }

 

}

export default RecommendContainer;