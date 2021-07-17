import colors from '../helpers/colors';
import map from '../maps/map0';

interface State {
  ctx: any;
  cooldown: boolean;
  debug_mode: boolean;
  maxTileHeight: number;
  acceleration: number;
  env: {
    tileWidth: number;
    map_tiles: number[][];
    map_tiles_height: number[][];
    tileHitBoxes: number[];
    lastHoveredTile: Object;
    lastHoveredTileType: number;
    rectColors: Object;
    rectShadowColors: Object;
    clearArea: number[];
    rotationDegree: number;
    map_offset_x: number;
    map_offset_y: number;
    winWidth: number;
    winHeight: number;
  };
  misc: Object[];
  keyMap: Object;
  cursorInMap: boolean;
}

let canvas : HTMLCanvasElement = document.querySelector('#main');

let state : State = ({
  ctx: canvas ? canvas.getContext('2d') : () => { console.error('no canvas context found!' ); },
  cooldown: false,
  debug_mode: false,
  maxTileHeight: 8,
  acceleration: 5,
  cursorInMap: undefined,
  env: {
    tileWidth: 24,
    // @param Array; main map
    map_tiles: map.tiles,
    map_tiles_height: map.tile_height,
    // @param Array; every item represents a tile hitboxes 
    // a tile hitbox is an object with the form {pointA, pointB, pointC, pointD}
    tileHitBoxes: [],
    lastHoveredTile: {},
    lastHoveredTileType: 0,
    
    rectColors: colors.rectColors,
    rectShadowColors: colors.rectShadowColors,
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