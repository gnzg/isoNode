import maps from '../maps';

export default {
  ctx: document.querySelector('#main') ? document.querySelector('#main').getContext('2d') : null,
  cooldown: false,
  env: {
    // The isometric map. Each item represents a row, each number in a row a tile.
    maps: maps,
    rotationDegree: 0,
    rectColors: [
      '000000',  // dummy
      '#096dff', // water
      '#8dee03', // vegetation
      '#a3f742', // arid vegetation
      'salmon'
    ],
    rectShadowColors: [
      '000000',
      '#0d49a9', // water sides
      '#04b807', // vegetation sides
      '#91d611', // arid vegetation sides
      'salmon'
    ],
    tileGraphicsToLoad: [
      "./images/water.png",
      "./images/land.png"
    ],
    // Set as your tile pixel sizes, alter if you are using larger tiles.
    tileWidth: 24,
    // mapX and mapY are offsets to make sure we can position the map as we want.
    mapX: 0,
    mapY: 350,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
    rotationDegree: 0,
    clearArea: [-1000, 50, 4000, 4000]            // Area to clear relative to the canvas
  },
  misc: [],
  // keep map of pressed keys
  keyMap: { 
    68: false,
    39: false,
    65: false,
    37: false,
    83: false,
    40: false,
    87: false,
    38: false,
    82: false
  }
};
