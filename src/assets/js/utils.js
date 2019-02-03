export let centerCanvas = ({winWidth, winHeight, map, tileW}) => {
  let centered = 0;
  let mapCenter = map.length/2 *tileW*2.3;
  centered = winWidth/2-mapCenter;
  // console.log('winWidth', winWidth, 'centered', mapCenter);
  return centered;
};

export let rotateMap = map => {
  let rotatedMap = [];
  for(let i=0; i < map[0].length; i++) { // x
    rotatedMap.push([]); // dummy fill
    for(let j=0; j < map.length; j++) {
      rotatedMap[i].push(map[j][i]);
    }
  }
  console.log('rotatedMap', rotatedMap);
  return rotatedMap;
};

export let floatText = (ctx,text) => {
  
};