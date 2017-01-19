import React from 'react';
import NavigationBar from '../item/NavigationBar.js';
import ListEndTag from '../item/listitem/EndTag.js';
import navigator from '../route.js';
import {getOrderPicList} from '../service/orderStore.js';
import {refactorArray} from '../util/arrayUtil.js';


import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ListView,
  Dimensions,
  RefreshControl,
  View
} from 'react-native';
const itemsPerRow = 2;
const horizontalMargin = 10;
const windowWidth = Dimensions.get('window').width;

const singleItemWidth = (windowWidth - (itemsPerRow + 1) * horizontalMargin) / itemsPerRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },	
  listView: {
    flex: 1,
    padding: horizontalMargin
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
 
  image: {
    width: singleItemWidth,
    height: 150
  },
  itemContainer: {
    width: singleItemWidth,
    borderWidth: 1,
    borderColor: '#DADADA',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#00000033',//#rrggbbaa
    justifyContent: 'space-between'//space-between两边无间隔 space-around两边有间隔
  },
  rowText: {
    fontSize: 12,
    color: 'white'
  },
  contentText: {
    marginVertical: 5,
    textAlign: 'left'
  },
  separatorLine: {
    height: 10
  }
});

class OrderPicContainer extends React.Component {

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

     let result=getOrderPicList(this.state.page,this.state.size);
   
     this.setState({isRefreshing: false,total:result.total,loaded:result.rows.length,rowData:result.rows});


  }

  refactorData(dataList) {
    return refactorArray(dataList,itemsPerRow);
  }

  _loadMoreData(){

    if(this.state.loaded<this.state.total){  
      let nextPage=this.state.page+1;
      let result=getOrderPicList(nextPage,this.state.size);
      this.setState({page:nextPage,total:result.total,loaded:this.state.loaded+result.rows.length,rowData:this.state.rowData.concat(result.rows)});
    }
  }

  _onPress(data) {
    //跳转
    navigator.push({
      name: 'FoodContainer',
      data
    });
  }
  
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const {data}=this.props;
    return (
    	 <View style={styles.container}>
    	    <NavigationBar
            onLeftPressed={()=>{ navigator.pop()}}
        		navigationBarProps={{
                  hideRightButton: true,
                  leftButtonImage: require('../image/return.png'),
     						  title: data.type+'('+data.fee+'元)'
    			}} />
    		<ListView style={ styles.listView} 
					dataSource={ds.cloneWithRows(this.refactorData(this.state.rowData))} 
					renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
          onEndReached={ this._loadMoreData.bind(this) }
          onEndReachedThreshold={10}
          renderSeparator={this.renderSeparator}
          renderFooter={()=>{ return <ListEndTag  isLoadAll={!this.state.isRefreshing&&this.state.loaded==this.state.total} />}}
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
      <View key={rowID} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {
          rowData.map(itemData => {
            return this.renderSingleItem(itemData);
          })
        }
      </View>
    );
  }

  renderSingleItem(data) {
    return (
      <TouchableOpacity key={data.id} onPress={() => {this._onPress(data)}}>
        <View style={styles.itemContainer} >
          <View>
            <Image style={styles.image} source={require('../image/timg.jpeg')}/>
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>{data.name}</Text>
              <Text style={styles.rowText}>{data.fee}元</Text>
            </View>
          </View>
          <Text numberOfLines={2} style={styles.contentText}>{data.type+"("+data.fav+")"}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  
  _onRefresh() {
    this.setState({isRefreshing: true});
    let result=getOrderPicList(1,this.state.size);
    setTimeout(() => {
           this.setState({page:1,isRefreshing: false,total:result.total,loaded:result.rows.length,rowData:result.rows});
    }, 5000);
  }

 

}

export default OrderPicContainer;