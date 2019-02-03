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
  ctx.font = '14px serif';
  ctx.fillStyle = 'black';  
  ctx.fillText(text, 25, 35);
  setTimeout(() => {
    let fade = 1;
    let timeOut = setInterval(() => {
      ctx.clearRect(0,0,500,100);
      ctx.fillStyle = `rgb(0,0,0,${fade})`;  
      ctx.fillText(text, 25, 35);
      fade-=0.1;  
      if (fade <= 0) clearInterval(timeOut);
    },25);
  },2000);
};