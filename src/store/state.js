import maps from '../maps';

export default {
  ctx: document.querySelector('#main') ? document.querySelector('#main').getContext('2d') : null,
  cooldown: false,
  env: {
    // The isometric map. Each item represents a row, each number in a row a tile.
    maps: maps,
    rectColors: [
      'empty',
      '#096dff',
      '#8dee03',
      '#29a36e',
      'salmon'
    ],
    rectShadowColors: [
      'empty',
      '#0d49a9',
      '#04b807',
      '#1c6e4a',
      'red'
    ],
    tileGraphicsToLoad: [
      "./images/water.png",
      "./images/land.png"
    ],
    // Set as your tile pixel sizes, alter if you are using larger tiles.
    tileW: 24,
    // mapX and mapY are offsets to make sure we can position the map as we want.
    mapX: 0,
    mapY: 350,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
    rotationDegree: 0
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
