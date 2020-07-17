import maps from '../maps/mapBundle';

export default {
  ctx: document.querySelector('#main') ? document.querySelector('#main').getContext('2d') : () => { console.error('no canvas context found!' ); },
  cooldown: false,
  debug_mode: false,
  env: {
    // @param {Array}; every item represents a tile map
    maps: maps,
    
    // @param {Array}; every item represents an array of tile hitboxes
    tileHitBoxes: [],
    lastHoveredTile: {},
    
    // @param {integer}; the tile size
    tileWidth: 24,

    rectColors: [
      '000000',  // dummy
      '#096dff', // water
      '#8dee03', // vegetation
      '#a3f742', // arid vegetation
      'yellow'
    ],
    rectShadowColors: [
      '000000',
      '#0d49a9', // water sides
      '#04b807', // vegetation sides
      '#91d611', // arid vegetation sides
      'orange'
    ],
    /*
    tileGraphicsToLoad: [
      "./images/water.png",
      "./images/land.png"
    ],
    */
    // @param {Array}; Area to clear relative to the canvas
    clearArea: [-1000, 0, 4000, 4000],       
    
    // @param {integer}; the degree of map rotation
    rotationDegree: 0,
    
    // mapX and mapY are offsets to make sure we can position the map as we want.
    mapX: 0,
    mapY: 350,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight
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
