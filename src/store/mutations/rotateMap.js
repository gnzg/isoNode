import store from '../index';

export default function rotateMap(state) {
  let maps = state.map_data.maps;
  let rotatedMaps = [];
  
  for (let n = 0; n < maps.length; n++) {
    let rotatedMap = [];
    let currentMap = maps[n];
    
    for (let i = 0; i < currentMap[0].length; i++) {
      rotatedMap.push([]); // dummy fill
      for (let j = 0; j < currentMap.length; j++) {
        currentMap[j] && rotatedMap[i].push(currentMap[j][i]);
      }
      rotatedMap[i].reverse();
    }
    rotatedMaps.push(rotatedMap);
    let currentMapName = Object.keys(maps)[n];
    state.map_data.maps[currentMapName] = rotatedMaps[n];
  }
  if (state.map_data.rotationDegree < 270) state.map_data.rotationDegree += 90; else state.map_data.rotationDegree = 0;
  // re-draw canvas
  store.dispatch('updateCanvas');
  return state;
}
