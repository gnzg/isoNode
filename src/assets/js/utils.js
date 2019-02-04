export let centerCanvas = ({winWidth, winHeight, map, tileW}) => {
  let centered = 0;
  let mapCenter = map.length/2 *tileW*2.3;
  centered = winWidth/2-mapCenter;
  // console.log('winWidth', winWidth, 'centered', mapCenter);
  return centered;
};

export let rotateMap = (maps, tempDegree) => {
  let degree = tempDegree < 270 ? tempDegree + 90 : 0;
  let rotatedMaps = [];
  console.log('degree', degree);
  for (let n = 0; n < maps.length; n++) {
  let rotatedMap = [];
    if (degree === 0) {
      for(let i=0; i < maps[n].length; i++) {
        rotatedMap.push([]); // dummy fill
        for(let j=0; j < maps[n][i].length; j++) {
          maps[n][i] && rotatedMap[i].push(maps[n][i][j]);
        }
      }
    }
    else if (degree === 90) {
      for(let i=0; i < maps[n][0].length; i++) { 
        rotatedMap.push([]); // dummy fill
        for(let j=0; j < maps[n].length; j++) {
          maps[n][j] && rotatedMap[i].push(maps[n][j][i]);
        }
        rotatedMap[i].reverse();
      }
    }
    else if (degree === 180) {
      for(let i=0; i < maps[n].length; i++) {
        rotatedMap.push([]); // dummy fill
        for(let j=0; j < maps[n][i].length; j++) {
          maps[n][i] && rotatedMap[i].push(maps[n][i][j]);
        }
        rotatedMap[i].reverse();
      }
      rotatedMap.reverse();
    }
    else if (degree === 270) {
      
    }
    rotatedMaps.push(rotatedMap);
  }
  return {rotatedMaps, degree};
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