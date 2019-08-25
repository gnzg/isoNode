import { draw } from '../utils';
export default {

  addItem(state, payload) {
    state.misc.push(payload);
    return state;
  },
  addEnvProp(state, payload) {
    state.env[`${payload.label}`] = payload.data;
    return state;
  },
  centerCanvas(state) {
    console.log('Window resized! Centering canvas...');
    let centered = 0;
    let mapCenter = state.env.map.length / 2 * state.env.tileW * 2.3;
    state.env.mapX = state.env.winWidth / 2 - mapCenter;
    state.env.mapY = state.env.winHeight / 2;
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
        for (let i = 0; i < maps[n].length; i++) {
          rotatedMap.push([]); // dummy fill
          for (let j = 0; j < maps[n][i].length; j++) {
            maps[n][i] && rotatedMap[i].push(maps[n][i][j]);
          }
        }
      }
      else if (degree === 90) {
        for (let i = 0; i < maps[n][0].length; i++) {
          rotatedMap.push([]); // dummy fill
          for (let j = 0; j < maps[n].length; j++) {
            maps[n][j] && rotatedMap[i].push(maps[n][j][i]);
          }
          rotatedMap[i].reverse();
        }
      }
      else if (degree === 180) {
        for (let i = 0; i < maps[n].length; i++) {
          rotatedMap.push([]); // dummy fill
          for (let j = 0; j < maps[n][i].length; j++) {
            maps[n][i] && rotatedMap[i].push(maps[n][i][j]);
          }
          rotatedMap[i].reverse();
        }
        rotatedMap.reverse();
      }
      else if (degree === 270) {
        for (let i = 0; i < maps[n][0].length; i++) {
          rotatedMap.push([]); // dummy fill
          for (let j = 0; j < maps[n].length; j++) {
            maps[n][j] && rotatedMap[i].push(maps[n][j][i]);
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
  },
  handleKeyDown(state) {
    //this = me;
    // allow mutation to take place only once cooldown is over
    // also, make sure an instance of drawFrequency is not running 

    // acceleration
    let inc = 10;
    // save posX at beginning of event
    let startingPosX = state.env.mapX;
    let startingPosY = state.env.mapY;
    // if not running, initiate interval
    if (state.keyMap[82]) {
      this.rotateMap(state);
      this.renderTiles(state);
    }
    let drawFrequency = setInterval(() => {
      if (state.keyMap[68]) {
        state.env.mapX += inc;
      }
      else if (state.keyMap[65]) state.env.mapX -= inc;

      if (state.keyMap[87]) {
        state.env.mapY -= inc;
      }
      else if (state.keyMap[83]) state.env.mapY += inc;

      if (state.keyMap[68] === false) {
        //alert('r key is up');
      }
      if (!state.keyMap[68] && !state.keyMap[65] &&
        !state.keyMap[87] && !state.keyMap[83]) {
        clearInterval(drawFrequency);
      }
      this.renderTiles(state);
    }, 20);
  },
  renderTiles(state) {
    if (state.ctx) {
      let ctx = state.ctx;
      let {
        map,
        tileW,
        mapX,
        mapY,
        rectColors,
        rectShadowColors
      } = state.env;
      // TODO: Add prevalance of elevated tiles if they rise above other tiles

      // clear entire canvas
      ctx.clearRect(-1000, -1000, 4000, 4000);

      if (map[0] !== undefined) {
        // loop through our map and draw out the image represented by the number.
        // iterator k draws the map across the y axis
        for (let k = 0; k < 9; k++) {
          // iterator i draws a row across the z axis
          for (let i = 0; i < map.length; i++) {
            // iterator j draws a row across the x axis
            for (let j = 0; j < map[i].length; j++) {
              // draw all three visible sides of the rect aspect

              
              // configure tile, draw map only then
              // as opposed to configure tile, draw map
              // 1) write a map object; 2) draw the map

              draw(ctx, map, mapX, mapY, tileW, i, j, k, rectColors, rectShadowColors);
            }
          }
        };
        // console.log('i', map.length, 'j', map[0].length);
      }
    }
    else {
      console.warn('No ctx object found!');
    }
  }
};