import renderTiles from './assets/js/renderTiles';
import {centerCanvas, rotateMap, floatText} from './assets/js/utils';
import store from './assets/js/store/index'; 

// import Count from './assets/js/components/count.js';
// import List from './assets/js/components/list.js';
// import Status from './assets/js/components/status.js';

import './assets/scss/styles.scss';
import canvasWrapper from './assets/js/components/canvasWrapper';

// TODO: create a tile map in a single file

const canvasWrapperInstance = new canvasWrapper();
canvasWrapperInstance.render();

//let stillRunning = false;


// const formElement = document.querySelector('.js-form');
// const inputElement = document.querySelector('#new-item-field');


// set size of canvas
//let canvas = document.getElementById('main');

// create the 2d canvas context
//let ctx = canvas.getContext('2d');

// add canvas object to env to use it within drawMap
//env.ctx = ctx;

window.addEventListener("DOMContentLoaded", function(event) {
  //renderTiles(env);
  //floatText(ctx, "Rotate canvas with R key");
  //env.mapX = centerCanvas(env);
});
/*

window.addEventListener("resize", function(event) {
  canvas.width = env.winWidth = window.innerWidth;
  canvas.height = env.winHeight = window.innerHeight;
  env.mapX = centerCanvas(env);
  renderTiles(env);
});
// rotate or move canvas
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
  } else if (e.keyCode === 39) {
    // right arrow key
    // move across x axis to the right
    let currentPos = env.mapX;
    let inc = 0.05;
    let drawFrequency = setInterval(() => {
      if (env.mapX < 526) {
        inc += 0.035
        env.mapX += (1/inc);
        renderTiles(env);
      } else {
        console.log('cleared interval.');
        clearInterval(drawFrequency);
      }
    },20);
  }
});

window.addEventListener('mouseup', e => {
  store.dispatch('addItem', 'foofoo');
  e.stopImmediatePropagation();
})
*/