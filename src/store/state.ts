import map from '../maps/map0';

interface State {
  ctx: any;
  cooldown: boolean;
  debug_mode: boolean;
  maxTileHeight: number;
  acceleration: number;
  env: {
    map: number[][];
    tileHitBoxes: number[];
    lastHoveredTile: Object;
    tileWidth: number;
    rectColors: string[];
    rectShadowColors: string[];
    clearArea: number[];
    rotationDegree: number;
    map_offset_x: number;
    map_offset_y: number;
    winWidth: number;
    winHeight: number;
  };
  misc: Object[];
  keyMap: Object;
}

let canvas : HTMLCanvasElement = document.querySelector('#main');

let state : State = ({
  ctx: canvas ? canvas.getContext('2d') : () => { console.error('no canvas context found!' ); },
  cooldown: false,
  debug_mode: false,
  maxTileHeight: 8,
  acceleration: 5,
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
    
    // map_offset_x and map_offset_y are offsets to make sure we can position the map as we want.
    map_offset_x: 0,
    map_offset_y: 350,
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
});

export default state;