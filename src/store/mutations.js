import Tile from '../tile';

const addItem = (state, payload) => {
  state.items.push(payload);
  return state;
}
const addEnvProp = (state, payload) => {
  state.env[`${payload.label}`] = payload.data;
  return state;
}
const centerCanvas = state => {
  console.log('Window resized! Centering canvas...');
  let centered = 0;
  let mapCenter = state.env.map.length / 2 * state.env.tileW * 2.3;
  state.env.mapX = state.env.winWidth / 2 - mapCenter;
  state.env.mapY = state.env.winHeight / 2;
  return state;
}
const rotateMap = state => {
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
}
const moveMap = (state, payload) => {
  //this = me;
  // allow mutation to take place only once cooldown is over
  // also, make sure an instance of drawFrequency is not running 
  if (state.cooldown === false) {
    state.cooldown = true;
    // acceleration
    let inc = 20;
    // save posX at beginning of event
    let startingPosX = state.env.mapX;
    let startingPosY = state.env.mapY;
    // if not running, initiate interval
    let drawFrequency = setInterval(() => {
      switch (payload) {
        case 68:
        case 39:
          state.env.mapX += inc;
          break;
        case 65:
        case 37:
          state.env.mapX -= inc;
          break;
        case 83:
        case 40:
          state.env.mapY += inc;
          break;
        case 87:
        case 38:
          state.env.mapY -= inc;
          break;
      }
      // per cooldown only one kind of movement is possible
      if (state.env.mapX > startingPosX + 100 ||
        state.env.mapX < startingPosX - 100 ||
        state.env.mapY > startingPosY + 100 ||
        state.env.mapY < startingPosY - 100
      ) {
        console.log('cleared interval');
        clearInterval(drawFrequency);
        state.cooldown = false;
      }
      renderTiles(state);
    }, 20);
  }
}
const renderTiles = state => {
  let ctx = state.ctx;
  let {
    map,
    waterWorld,
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

          let mapTile = new Tile({
            i: i,
            j: j,
            k: k,
            tileW: tileW,
            mapX: mapX,
            mapY: mapY,
            map: map,
            rectColors: rectColors,
            rectShadowColors: rectShadowColors,
            waterWorld: waterWorld,
          });

          mapTile.draw(ctx);

        }
      }
    };
    // console.log('i', map.length, 'j', map[0].length);
  }
}

module.exports = {rotateMap, centerCanvas, addEnvProp, addItem, moveMap, renderTiles};