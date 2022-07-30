import StateInterface from '../interfaces/StateInterface';
import colors from '../utilities/colors';
import map from '../assets/maps/map0';

let canvas : HTMLCanvasElement = document ? document.querySelector('#main') : undefined ;
//if (!canvas) store.dispatch("error", "no canvas context found!" );

// Initial state on first load
let State : StateInterface = {
  ctx: canvas ? canvas.getContext('2d') : undefined,
  debug_mode: false,
  maxTileHeight: 8,
  acceleration: 5,
  cursorInMap: undefined,
  cursor_pos_x: 0,
  cursor_pos_y: 0,
  map,
  map_data: {
    tileWidth: 24,
    map_tiles: map.tiles,
    map_tiles_height: map.tile_height,
    tileHitBoxes: [],
    lastHoveredTile: {
      x: undefined,
      y: undefined
    },
    lastHoveredTileType: 0,
    rectColors: colors.rectColors,
    rectShadowColors: colors.rectShadowColors,

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
  // keep track of the simultaneously pressed down keys to allow key combinations
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

export default State;