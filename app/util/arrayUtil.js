



export function refactorArray(list,size){	
	let nList = [];
    let tempArray = [];
    let length = list.length;
    for(let i = 0; i < length; i++) {
      tempArray.push(list[i]);
      if (tempArray.length === size) {
         nList.push(tempArray);
         tempArray = [];
      }
    }
    if (tempArray.length > 0) {
      nList.push(tempArray);
    }
    return nList;
}