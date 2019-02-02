import renderTiles from './assets/js/renderTiles';
import { map, waterWorld } from './assets/js/map';
import './assets/scss/styles.scss';

let centerCanvas = () => {
  let centered = 0;
  centered = -Math.sqrt(Math.pow(env.tileH, 2)*Math.pow(env.tileH, 2))/2+window.innerWidth/4;
  return centered;
};

let env = {
  // The isometric map. Each item represents a row, each number in a row a tile.
  map: map,
  waterWorld: waterWorld,
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
  // TODO: create a tile map in a single file
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
  mapX: 300,
  mapY: 350
};

// set size of canvas
let canvas = document.getElementById('main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// create the 2d canvas context
let ctx = canvas.getContext('2d');

// add canvas object to env to use it within drawMap
env.ctx = ctx;

window.addEventListener("DOMContentLoaded", function(event) {
  let centeredCanvasContent = centerCanvas();
  //alert(centeredCanvasContent);
  document.querySelector("#canvas-div").setAttribute("style", `position: absolute; left:0px; top:0px; width:${window.innerWidth}px`);
  env.mapX = centeredCanvasContent;
  renderTiles(env);
});
window.addEventListener("resize", function(event) {
  // TODO
  /*if (document.readyState === "complete" || document.readyState === "loaded") {
    document.querySelector("#canvas-div").setAttribute("style", `position: absolute; left:0px; top:0px; width:${window.innerWidth}px`);
    env.mapX = centerCanvas();
    // draw map
    renderTiles(env);
  }*/
});
let stillRunning = false;
canvas.addEventListener('click', e => {
  if (stillRunning) return;

  stillRunning = true;
  //get position of canvas relative to body
  let canvasBounds = canvas.getBoundingClientRect();
  let mousePosX = e.pageX - canvasBounds.left;
  let mousePosY = e.pageY - canvasBounds.top;
  console.log('mousePosX',mousePosX, 'mousePosY', mousePosY);
// TODO
// hit logic goes here
// a hit causes a change in the map array
// update map array

// draw new tile map based on updated map array
  //env.map[1][5] = 2;
  let x = 100;
  let interval = setInterval(() => {
    console.log(x);
    x = x*0.98; 
    env.tileW = 24*x/100;
    renderTiles(env);
    if (x <20) {
      clearInterval(interval);
      stillRunning = false;
    }
  },20);
});