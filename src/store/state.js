import map from '../maps/map0';

export default {
  ctx: document.querySelector('#main') ? document.querySelector('#main').getContext('2d') : () => { console.error('no canvas context found!' ); },
  cooldown: false,
  debug_mode: true,
  maxTileHeight: 8,
  drawFrequency: null,
  env: {
    // @param Array; main map
    map,
    // @param Array; every item represents a tile hitboxes 
    // a tile hitbox is an object with the form {pointA, pointB, pointC, pointD}
    tileHitBoxes: [],
    lastHoveredTile: {},
    
    // @param Integer; the tile size
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
    // @param Array; Area to clear relative to the canvas
    clearArea: [-1000, 0, 4000, 4000],       
    
    // @param Integer; the degree of map rotation
    rotationDegree: 0,
    
    // mapX and mapY are offsets to make sure we can position the map as we want.
    mapX: 0,
    mapY: 350,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight
  },
  misc: [],
  // save a map of pressed keys to allow key combinations
  keyMap: { 
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false
  }
};
