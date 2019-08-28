export default function rotateMap(state) {
  let tempDegree = 0;
  let maps = state.env.maps;
  let degree = tempDegree < 270 ? tempDegree + 90 : 0;
  let rotatedMaps = [];
  console.log('degree', degree);
  for (let n = 0; n < Object.keys(maps).length - 1; n++) {
    let rotatedMap = [];
    let currentMap = maps[Object.keys(maps)[n]];
    console.log('All maps', Object.keys(maps));
    console.log('currentMap', maps[Object.keys(maps)[n]]);
    if (degree === 0) {
      for (let i = 0; i < currentMap.length; i++) {
        rotatedMap.push([]); // dummy fill
        for (let j = 0; j < currentMap[i].length; j++) {
          currentMap[i] && rotatedMap[i].push(currentMap[i][j]);
        }
      }
    }
    else if (degree === 90) {
      console.log('currentMap length', currentMap[0].length);
      for (let i = 0; i < currentMap[0].length; i++) {
        rotatedMap.push([]); // dummy fill
        for (let j = 0; j < currentMap.length; j++) {
          currentMap[j] && rotatedMap[i].push(currentMap[j][i]);
        }
        rotatedMap[i].reverse();
      }
    }
    else if (degree === 180) {
      for (let i = 0; i < currentMap.length; i++) {
        rotatedMap.push([]); // dummy fill
        for (let j = 0; j < currentMap[i].length; j++) {
          currentMap[i] && rotatedMap[i].push(currentMap[i][j]);
        }
        rotatedMap[i].reverse();
      }
      rotatedMap.reverse();
    }
    else if (degree === 270) {
      for (let i = 0; i < currentMap[0].length; i++) {
        rotatedMap.push([]); // dummy fill
        for (let j = 0; j < currentMap.length; j++) {
          currentMap[j] && rotatedMap[i].push(currentMap[j][i]);
        }
      }
      rotatedMap.reverse();
    }
    rotatedMaps.push(rotatedMap);
  }
  // major TODO, i.e. rotate all maps
  state.env.map = rotatedMaps[0];
  state.env.waterWorld = rotatedMaps[1];

  return state;
}
