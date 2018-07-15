import drawMap from './drawMap';

// Create the isometric scope.
// Tutorial Note: Wrapping all our code within a function this way means all
// our variables and functions don't become globals. This prevents conflicts if you're using other scripts.
let env = {
  // Two Dimensional Array storing our isometric map layout. Each number represents a tile.
  map: [
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 2, 0, 2, 2, 2, 1, 1, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 2, 2, 2, 2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0]
  ],
  rectColors: [
    'empty',
    '#336699',
    '#006600',
    '#29a36e',
    'salmon'
  ],
  rectShadowColors: [
    'empty',
    '#274d74',
    '#004100',
    '#1c6e4a',
    'red'
  ],
  tileGraphicsToLoad: [
    "./images/water.png",
    "./images/land.png"
  ],
  // draw map based on images or colored rects
  mode: 'rects',
  // Set as your tile pixel sizes, alter if you are using larger tiles.
  tileH: 24,
  tileW: 24,

  // mapX and mapY are offsets to make sure we can position the map as we want.
  mapX: 200,
  mapY: 300,

};

// set size of canvas
let canvas = document.getElementById('main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// create the 2d canvas context
let ctx = canvas.getContext('2d');

// add canvas object to env to use it within drawMap
env.ctx = ctx;

// draw map
drawMap(env);
