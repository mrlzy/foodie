let total=10;


    
let icons=['ios-briefcase', 'ios-cube', 'ios-podium', 'ios-settings','ios-help-circle','ios-briefcase', 'ios-cube', 'ios-podium', 'ios-settings','ios-help-circle'];
let icons_name=['川菜','湘菜','粤菜','东北菜','西北菜','鄂菜','京菜','晋菜','清真','上海菜','云南菜'];
let icons_color=['rgba(60, 177, 158, 1)', 'rgba(240, 212, 29, 1)','rgba(199, 85, 74, 1)','rgba(0, 0, 0, 0.6)','rgba(216, 196, 128, 1)','rgba(60, 177, 158, 1)', 'rgba(240, 212, 29, 1)','rgba(199, 85, 74, 1)','rgba(0, 0, 0, 0.6)','rgba(216, 196, 128, 1)'];

export function getMenuList1(){	
	let ss=[];
	for(let i=0;i<total;i++){
        ss[i]={"id":i+1,"icon":icons[i],"title":icons_name[i],"color":icons_color[i]};
         
	}
	return ss;
}


let icons_name2=['煎','炒','炸','红烧','煮','蒸','烧烤','焖','炖','拌','烙'];

export function getMenuList2(){	
	let ss=[];
	for(let i=0;i<total;i++){
        ss[i]={"id":i+1,"icon":icons[i],"title":icons_name2[i],"color":icons_color[i]};
         
	}
	return ss;
}