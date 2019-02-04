export let centerCanvas = ({winWidth, winHeight, map, tileW}) => {
  let centered = 0;
  let mapCenter = map.length/2 *tileW*2.3;
  centered = winWidth/2-mapCenter;
  // console.log('winWidth', winWidth, 'centered', mapCenter);
  return centered;
};

export let rotateMap = (map, tempDegree) => {
  let rotatedMap = [];
  let degree = tempDegree < 270 ? tempDegree + 90 : 90;
  console.log('degree', degree);
  if (degree === 0 || degree === 270) {
    for(let i=0; i < map.length; i++) {
      rotatedMap.push([]); // dummy fill
      for(let j=0; j < map[i].length; j++) {
        map[i] && rotatedMap[i].push(map[i][j]);
      }
    }
  }
  else if (degree === 90) {
    for(let i=0; i < map[0].length; i++) { 
      rotatedMap.push([]); // dummy fill
      for(let j=0; j < map.length; j++) {
        map[j] && rotatedMap[i].push(map[j][i]);
      }
      rotatedMap[i].reverse();
    }
  }
  else if (degree === 180) {
    //if (degree === 90 ) map.reverse();
    for(let i=0; i < map[0].length; i++) {
      rotatedMap.push([]); // dummy fill
      for(let j=0; j < map.length; j++) {
        map[j] && rotatedMap[i].push(map[j][i]);
      }
    }
    rotatedMap.reverse();
  }
 
  return {rotatedMap, degree};
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