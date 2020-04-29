import store from '../index';

export default function rotateMap(state) {
  let maps = state.env.maps;
  let rotatedMaps = [];
  //console.log('All maps', Object.keys(maps));
  
  
  for (let n = 0; n < Object.keys(maps).length; n++) {
    let rotatedMap = [];
    let currentMap = maps[Object.keys(maps)[n]];
    //onsole.log('currentMap', Object.keys(maps)[n]);
    
    //console.log('currentMap length', currentMap[0].length);
    for (let i = 0; i < currentMap[0].length; i++) {
      rotatedMap.push([]); // dummy fill
      for (let j = 0; j < currentMap.length; j++) {
        currentMap[j] && rotatedMap[i].push(currentMap[j][i]);
      }
      rotatedMap[i].reverse();
    }
    //console.log('rotatedMap', rotatedMap);
    rotatedMaps.push(rotatedMap);
    let currentMapName = Object.keys(maps)[n];
    state.env.maps[currentMapName] = rotatedMaps[n];
  }
  if (state.env.rotationDegree < 270) state.env.rotationDegree += 90; else state.env.rotationDegree = 0;
  console.log('rotationDegree', state.env.rotationDegree); 
  store.dispatch('renderTiles');
}
