let total=5;
let icons=['ios-briefcase', 'ios-cube', 'ios-podium', 'ios-settings','ios-help-circle'];
let icons_name=['钱包','收藏','健康','设置','关于'];
let icons_color=['rgba(60, 177, 158, 1)', 'rgba(240, 212, 29, 1)','rgba(199, 85, 74, 1)','rgba(0, 0, 0, 0.6)','rgba(216, 196, 128, 1)'];

export function getMenuList(){	
	let ss=[];
	for(let i=0;i<total;i++){
        ss[i]={"id":i+1,"icon":icons[i],"title":icons_name[i],"color":icons_color[i]};
         
	}
	return ss;
}