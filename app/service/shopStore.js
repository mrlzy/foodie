let total=12;

export function getOrderList(){
	let dd=new Object();
	dd['total']=total;
	let ss=[];
	for(let i=0;i<total;i++){
      ss[i]={"id":i,"buyStatus":0,"name":"菜品"+i,"number":"1","fee":i%3+1};
         
	}
	dd['rows']=ss;
	return dd;
}