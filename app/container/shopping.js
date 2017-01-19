import React, { Component } from 'react';

import  {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Alert,
  Dimensions,
  ListView,
  TouchableOpacity,
  PixelRatio,
  RefreshControl,
  View,
} from 'react-native'
import ShoppingNavBar from '../item/ShoppingNavBar.js';
import Buttom from '../item/Buttom.js';
import {getOrderList} from '../service/shopStore.js';

const windowWidth = Dimensions.get('window').width-50;
const windowHeight = Dimensions.get('window').height;


  const billStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: 'rgb(240, 240, 240)',
      width: windowWidth / 5,

    };
const BrandNameStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      width: windowWidth / 13,
      height: windowWidth / 13,
      backgroundColor: 'rgb(240, 240, 240)',
      marginLeft: 5,
      borderColor: 'black',
      borderWidth: 1 / PixelRatio.get(),
      borderRadius: windowWidth / 13,


    };
    const isLoading = true;
const cellHeight = windowWidth / 3;


var images=[
   require('../image/timg2.jpeg')
];
export default class ShoppingCart extends Component {
  

  constructor (props) {
    super(props);
    this.state = {
        isRefreshing:true,
        selectLen:0,
        isSelectAll:false,
        total:0,
        rowData:[]
    };
    
  }
  

  componentWillMount () {
    let result=getOrderList();
    this.setState({isRefreshing:false,total:result.total,rowData:result.rows,selectLen:0,isSelectAll:false});
  }

  onPress2Right(){

  }

 
  onPress2ALL(){
    let rows=this.state.rowData;
    let selectAll=this.state.isSelectAll;
    let slen=0;
    if(selectAll){
        slen=0;
        for(let i=0;i<rows.length;i++){
             rows[i].buyStatus=0;
        }
        selectAll=false;
    }else{
        slen=rows.length;
        for(let i=0;i<rows.length;i++){
             rows[i].buyStatus=1;
        }
        selectAll=true;
    }
    this.setState({selectLen:slen,rowData:rows,isSelectAll:selectAll});

  }

  selectOne(id){
    let rows=this.state.rowData;
    let slen=this.state.selectLen;

    for(let i=0;i<rows.length;i++){
        if(rows[i].id==id){
           if(rows[i].buyStatus){
              rows[i].buyStatus=0;
              slen--;
           }else{
              rows[i].buyStatus=1;
              slen++;
           }
           
           break;
        }
    }
    let selectAll= (slen==this.state.total);
    this.setState({selectLen:slen,rowData:rows,isSelectAll:selectAll});

  }

  reloadData(){
      let rows=this.state.rowData;
      let newrows=[];
      let slen=0;
        for(let i=0;i<rows.length;i++){
            if(rows[i].number>0){
               newrows.push(rows[i]);
               if(rows[i].buyStatus) slen++;

            }
        }
      rows=newrows;
      let selectAll= (slen==rows.length);
      this.setState({total:rows.length,selectLen:slen,rowData:rows,isSelectAll:selectAll});
  }

  changeShopCount(ff,id){
    var rows=this.state.rowData;
    let slen=this.state.selectLen;
    let reload=false;
    for(let i=0;i<rows.length;i++){
        if(rows[i].id==id){
            if(ff){
              if(!rows[i].buyStatus){
                 rows[i].buyStatus=1;
                  slen++;
              }
              rows[i].number++;
            }else{
              if(rows[i].number>1){
                rows[i].number--;
              }else{
                 if(rows[i].buyStatus){
                    rows[i].buyStatus=0;
                    slen--;
                 }
                 reload=true;
                 Alert.alert('提醒','确定移出购物车?',[ 
                  {text: '确定', onPress: () => {
                         rows[i].number--;
                         this.reloadData();

                  }},
                  {text: '取消'}]);
                 
              }
            }
           break;
        }
    }
    
    if(!reload){
        let selectAll= (slen==rows.length);
        this.setState({total:rows.length,selectLen:slen,rowData:rows,isSelectAll:selectAll});
    }
   
  }


  getAllfee(){
     let rows=this.state.rowData;
     let fee=0;
     for(let i=0;i<rows.length;i++){
        if(rows[i].buyStatus)
         fee+=rows[i].number*rows[i].fee;
     }
     return fee;
  }

  _renderRow(rowData, sectionID, rowID) {
      var isSelect = rowData.buyStatus;
      return (
              <View style={styles.rowLine}>
                 <View style={{ flexDirection: 'column' }}>
                    <View style={styles.row}>
                        <View style={styles.imgAndButton}>
                                        <Buttom
                                            containerStyle = {
                                                [BrandNameStyle, isSelect ? { backgroundColor: 'black' } : { backgroundColor: '#fcfcfc' }]
                                            }
                                            style={[{ fontSize: 16, textAlign: 'center' },
                                                isSelect ? { color: 'white' } : { color: 'white' }]}
                                            text={'√'}
                                            onPress={
                                                () => this.selectOne(rowData.id)
                                            }
                                            />
                        </View>
                        <View style={styles.bigCell}>
                               <View style={styles.tradeName}>
                                    <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.img}>
                                                    <Image
                                                        source={images[0]}
                                                        style={{ width: cellHeight * 3 / 5 - 5, height: cellHeight * 3 / 5 - 5 }}
                                                        />
                                                </View>
                                                <View style={styles.shopDetial}>
                                                    <Text style={styles.shopDetialTitle}>{'名称:' + rowData.name}</Text>
                                                    <Text  style={styles.shopDetialTitle}>{'标签:辣,炒'}</Text>
                                                    <Text style={styles.shopDetialTitle}>{'厨师:maomao'}</Text>
                                                </View>
                                    </View>
                                    <View style={styles.priceAndCound}>
                                        <Text style={{ height: cellHeight * 4 / 5 / 3, fontSize: 12, color: 'red', textAlign: 'right' }}>{'¥'+rowData.fee}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    onPress={() => this.changeShopCount(false, rowData.id) }
                                                    activeOpacity={0.75}
                                                    style={styles.countButton} >

                                                    <Text >-</Text>
                                                </TouchableOpacity>
                                                <View style={[styles.countButton, { borderRightWidth: 0, borderLeftWidth: 0 }]} >
                                                    <Text >{rowData.number}</Text>

                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => this.changeShopCount(true, rowData.id) }
                                                    activeOpacity={0.75}
                                                    style={styles.countButton} >

                                                    <Text>+</Text>

                                                </TouchableOpacity>

                                            </View>                                       
                                    </View>
                               </View>
                        </View>
                    </View>
                 </View>   
                 <View style={{ width: windowWidth, height: windowHeight / 70 }}></View>
           </View>
        );
    }

  render() {
    let {closeDrawer} = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    let allfee=this.getAllfee();
    isBill=this.state.selectLen;
    isSelect = this.state.isSelectAll;

    return (
      <View style={styles.container}>
        <ShoppingNavBar onPress2Right={closeDrawer} RightTitle={'隐藏'}/>

        <View style={styles.StyleFor18} >
                <ListView
                      dataSource={ds.cloneWithRows(this.state.rowData)} 
                      renderRow={this._renderRow.bind(this)}
                      enableEmptySections={true}
                      initialListSize= {10}
                      refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={()=>{}}
                        tintColor="gray"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="gray"/>
                      }
                      style={{backgroundColor: 'white'}}
                />
        </View>

        <View style={{ backgroundColor: 'rgb(240, 240, 240)', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Buttom
                    containerStyle = {
                      [BrandNameStyle, isSelect ? { backgroundColor: 'black' } : { backgroundColor: '#fcfcfc' }]
                    }
                    style={[{ fontSize: 16, textAlign: 'center' },
                      isSelect ? { color: 'white' } : { color: 'white' }]}
                    text={'√'}
                    onPress={this.onPress2ALL.bind(this) }

                    />
                  <Text style= {{ width: windowWidth/ 8, marginLeft: 5 }}>全选</Text>
                </View>
                <View >
                    <Text style={{ color: 'red' }}>{'总价:¥'+allfee}</Text>
                    <Text style={{fontSize: 11 ,marginTop:5}}>{'商品金额:¥'+allfee+',已减0'}</Text>  
                </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Buttom
                    containerStyle = {
                      [billStyle, isBill ? { backgroundColor: 'red' } : { backgroundColor: 'gray' }]
                    }
                    style={[{ fontSize: 16, textAlign: 'center' },
                      isBill ? { color: 'white' } : { color: 'white' }]}
                    text={'去结算'}
                    disabled={!Boolean(isBill)}
                    onPress={()=>{alert('结账小弟:共'+allfee+'元')}}

                    />
          </View>
        </View>  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
   priceAndCound: {
        backgroundColor: 'white',
        marginTop: cellHeight / 5,
        width: windowWidth * 1 / 5
  },
  StyleFor18: {
        flexDirection: 'row',
        height: windowHeight - 60 -  50,
        width: windowWidth
  },
  row: {
        width: windowWidth,    
        backgroundColor: 'white',
        flexDirection: 'row',
  },
  rowLine: {
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
  },
  bigCell: {
        backgroundColor: 'white',

  },
     img: {
        // backgroundColor: 'yellow',
        width: cellHeight * 3 / 5,
        height: cellHeight * 3 / 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 15,

    },
     shopDetial: {
        backgroundColor: 'white',
        paddingTop: 10,
        width: windowWidth * 2 / 5,
        marginLeft: 5,
        marginTop: 5,


    },
    shopDetialTitle: {
        height: cellHeight * 4 / 5 / 3 - 6,
        fontSize: 11,
        color: 'rgb(133,133,133)',
    },
   tradeName: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
       countButton: {
        width: 25,
        height: 20,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1 / PixelRatio.get(),
    },
  imgAndButton: {
        backgroundColor: 'white',
        width: windowWidth / 10,
        // height: cellHeight,
        marginLeft: 10,
        marginTop: 25,

        alignItems: 'center',
        justifyContent: 'center',

    }
})
