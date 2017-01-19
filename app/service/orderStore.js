
let total=53;

export function getOrderList(page,size){
	let dd=new Object();
	dd['total']=total;
	let start=(page-1)*size;//0
	let end=page*size;//20
	let ss=[];

	for(let i=start+1,j=0;i<=end;i++,j++){
         if(i<=total){
         	ss[j]={"id":i,"time":i,"type":"中餐","fee":"12.5"};
         }
	}
	dd['rows']=ss;
	return dd;
}




export function getOrderPicList(page,size){
	let dd=new Object();
	dd['total']=total;
	let start=(page-1)*size;//0
	let end=page*size;//20
	let ss=[];

	for(let i=start+1,j=0;i<=end;i++,j++){
         if(i<=total){
         	ss[j]={"id":i,"name":"菜"+i,"type":"热菜","fee":"3","pic":"../image/timg.jpeg","goodnum":i,"fav":"辣","content":"\u5982\u679c\u4f60\u62d2\u7edd\u63a5\u53d7\u6211\u7684\u4fe1\uff0c\u6211\u4e5f\u7167\u5199\u4e0d\u8bef\uff0c\u4ee5\u4fbf\u4f60\u77e5\u9053\u81f3\u5c11\u6709\u4fe1\u4e00\u76f4\u5728\u5bb6\u7b49\u7740\u4f60\u3002 by \u738b\u5c14\u5fb7"};
         }
	}
	dd['rows']=ss;
	return dd;
}

