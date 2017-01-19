import React from 'react';
import NavigationBar from '../item/NavigationBar.js';
import ListEndTag from '../item/listitem/EndTag.js';
import {getOrderList} from '../service/orderStore.js';
import navigator from '../route.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  itemText: {
    color: '#79767C',
    fontSize: 18
  },
  itemImage: {
    width: 20,
    height: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#79767C',
    marginHorizontal: 15
  }
});

class OrderContainer extends React.Component {

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

    return (
    	 <View style={styles.container}>
    	    <NavigationBar
        		navigationBarProps={{
      						leftButtonImage: require('../image/search_min.png'),
      						rightButtonImage: require('../image/individual_center.png'),
     						 title: '订单'
    			}} />
    		<ListView style={ styles.listViewContent } 
					dataSource={ds.cloneWithRows(this.state.rowData)} 
					renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
          onEndReached={ this._loadMoreData.bind(this) }
          onEndReachedThreshold={10}
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




  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity key={rowID}  onPress={() => {this._onPress(rowData)}}>
        <View style={styles.itemView}>
          <Text style={styles.itemText}>{rowData.time} {rowData.type}  共{rowData.fee}元</Text>
          <Image style={styles.itemImage} resizeMode="contain" source={require('../image/forward.png')}/>
        </View>
      </TouchableOpacity>
    );
  }

  _onPress(data) {
    //跳转
    navigator.push({
      name: 'OrderPicContainer',
      data
    });
  }
  
  _onRefresh() {
    this.setState({isRefreshing: true});
    let result=getOrderList(1,this.state.size);
    setTimeout(() => {
           this.setState({page:1,isRefreshing: false,total:result.total,loaded:result.rows.length,rowData:result.rows});
    }, 5000);
  }

 

}

export default OrderContainer;