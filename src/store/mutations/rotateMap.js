import store from '../index';

export default function rotateMap(state) {
  let tempDegree = 0;
  let maps = state.env.maps;
  let degree = tempDegree < 270 ? tempDegree + 90 : 0;
  let rotatedMaps = [];
  console.log('degree', degree);
  //console.log('All maps', Object.keys(maps));
  
  for (let n = 0; n < Object.keys(maps).length; n++) {
    let rotatedMap = [];
    let currentMap = maps[Object.keys(maps)[n]];
    //onsole.log('currentMap', Object.keys(maps)[n]);
    if (degree === 0) {
      for (let i = 0; i < currentMap.length; i++) {
        rotatedMap.push([]); // dummy fill
        for (let j = 0; j < currentMap[i].length; j++) {
          currentMap[i] && rotatedMap[i].push(currentMap[i][j]);
        }
      }
    }
    else if (degree === 90) {
      //console.log('currentMap length', currentMap[0].length);
      for (let i = 0; i < currentMap[0].length; i++) {
        rotatedMap.push([]); // dummy fill
        for (let j = 0; j < currentMap.length; j++) {
          currentMap[j] && rotatedMap[i].push(currentMap[j][i]);
        }
        //console.log('rotated map is', rotatedMap[i]);
        rotatedMap[i].reverse();
      }
      //console.log('rotatedMap', rotatedMap);
    } /*
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
    } */
    rotatedMaps.push(rotatedMap);
    let currentMapName = Object.keys(maps)[n];
    state.env.maps[currentMapName] = rotatedMaps[n];
    store.dispatch('renderTiles');
  }
}
