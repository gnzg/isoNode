import renderTiles from './assets/js/renderTiles';
import {floatText} from './assets/js/utils';
import store from './assets/js/store/index'; 

import './assets/scss/styles.scss';
import canvasWrapper from './assets/js/components/canvasWrapper';

const canvasWrapperInstance = new canvasWrapper();

//let stillRunning = false;

window.addEventListener("DOMContentLoaded", function(event) {
  canvasWrapperInstance.render();
  store.dispatch('centerCanvas');
  floatText(store.state.env.ctx, 'Press R to rotate the canvas');
});
window.addEventListener("resize", function(event) {
  store.state.env.winWidth = window.innerWidth;
  store.state.env.winHeight = window.innerHeight;
  store.dispatch('centerCanvas');
  canvasWrapperInstance.render();
});

// rotate or move canvas
window.addEventListener("keydown", e => {
  if(e.keyCode === 82) {
    store.dispatch('rotateMap');
    canvasWrapperInstance.render();
/*
    //get position of canvas relative to body
    // let canvasBounds = canvas.getBoundingClientRect();
    // let mousePosX = e.pageX - canvasBounds.left;
    // let mousePosY = e.pageY - canvasBounds.top;
    // console.log('mousePosX',mousePosX, 'mousePosY', mousePosY);

    // prevent bubbling
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
    */
  }
});