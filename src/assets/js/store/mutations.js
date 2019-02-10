import { rotateMap } from "../utils";

export default {
  addItem(state, payload) {
    state.items.push(payload);
    return state;
  },
  addEnvProp(state, payload) {
    state.env[`${payload.label}`] = payload.data;
    return state;
  },
  centerCanvas(state) {
    console.log('resized! Centering canvas...');
    let centered = 0;
    let mapCenter = state.env.map.length/2 *state.env.tileW*2.3;
    state.env.mapX = state.env.winWidth/2-mapCenter;
    return state;
  },
  rotateMap(state) {
      let tempDegree = 0;
      let maps = [state.env.map, state.env.waterWorld];
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
          for(let i=0; i < maps[n][0].length; i++) {
            rotatedMap.push([]); // dummy fill
            for(let j=0; j < maps[n].length; j++) {
              maps[n][j] && rotatedMap[i].push(maps[n][j][i]);
            }
          }
          rotatedMap.reverse();
        }
        rotatedMaps.push(rotatedMap);
      }
      // major TODO
      state.env.map = rotatedMaps[0];
      state.env.waterWorld = rotatedMaps[1];

      return state;
  }
};