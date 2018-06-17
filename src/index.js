import drawImageMap from './drawImageMap';

// Create the isometric scope.
// Tutorial Note: Wrapping all our code within a function this way means all
// our variables and functions don't become globals. This prevents conflicts if you're using other scripts.
const isometric = () => {
  let env = {
    // Two Dimensional Array storing our isometric map layout. Each number represents a tile.
    map: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    rectColors: [
      '#336699',
      '#006600'
    ],
    tileGraphicsToLoad: [
      "./src/water.png",
      "./src/land.png"
    ],
    // draw map based on images or colored rects
    mode: 'rects',
    // Set as your tile pixel sizes, alter if you are using larger tiles.
    tileH: 48,
    tileW: 48,

    // mapX and mapY are offsets to make sure we can position the map as we want.
    mapX: 40,
    mapY: 280,

  };

  // set size of canvas
  let canvas = document.getElementById('main');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // create the 2d canvas context
  let ctx = canvas.getContext('2d');
  ctx.setTransform(-1, 0.5, 1, 0.5, 200, -80);

  env.ctx = ctx;

  // draw map
  drawImageMap(env);

};

isometric();