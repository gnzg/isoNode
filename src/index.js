import renderTiles from './assets/js/renderTiles';
import { map, waterWorld } from './assets/js/map';
import {centerCanvas, rotateMap, floatText} from './assets/js/utils';
import './assets/scss/styles.scss';

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
  // Set as your tile pixel sizes, alter if you are using larger tiles.
  tileW: 24,
  // mapX and mapY are offsets to make sure we can position the map as we want.
  mapX: 0,
  mapY: 350,
  winWidth: 0,
  winHeight: 0,
  rotationDegree: 0
};

//let stillRunning = false;

// set size of canvas
let canvas = document.getElementById('main');
// create the 2d canvas context
let ctx = canvas.getContext('2d');

// add canvas object to env to use it within drawMap
env.ctx = ctx;


window.addEventListener("DOMContentLoaded", function(event) {
  canvas.width = env.winWidth = window.innerWidth;
  canvas.height = env.winHeight = window.innerHeight;
  env.mapX = centerCanvas(env);
  renderTiles(env);
  floatText(ctx, "Rotate canvas with R key");
});
window.addEventListener("resize", function(event) {
  canvas.width = env.winWidth = window.innerWidth;
  canvas.height = env.winHeight = window.innerHeight;
  env.mapX = centerCanvas(env);
  renderTiles(env);
});

// rotate canvas
window.addEventListener("keydown", e => {
  if(e.keyCode === 82) {
    //get position of canvas relative to body
    // let canvasBounds = canvas.getBoundingClientRect();
    // let mousePosX = e.pageX - canvasBounds.left;
    // let mousePosY = e.pageY - canvasBounds.top;
    // console.log('mousePosX',mousePosX, 'mousePosY', mousePosY);

    let rotatedState = rotateMap([map, waterWorld], env.rotationDegree);
    env.map = rotatedState.rotatedMaps[0];
    env.waterWorld = rotatedState.rotatedMaps[1];
    env.rotationDegree = rotatedState.degree;

    renderTiles(env);
    // prevent bubbling
    e.stopImmediatePropagation();
  }
});