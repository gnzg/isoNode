import {floatText} from './assets/js/utils';
import store from './assets/js/store/index'; 
import canvasWrapper from './assets/js/components/canvasWrapper';
import './assets/scss/styles.scss';

const canvasWrapperInstance = new canvasWrapper('main');

window.addEventListener("DOMContentLoaded", () => {
  canvasWrapperInstance.render();
  store.dispatch('centerCanvas');
  floatText(store.state.ctx, 'Press R to rotate the canvas');
});
window.addEventListener("resize", () => {
  store.state.env.winWidth = window.innerWidth;
  store.state.env.winHeight = window.innerHeight;
  store.dispatch('centerCanvas');
  canvasWrapperInstance.render();
});
// Rotate or move canvas on key down
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
    */
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    console.log('eventListener is there', window);
    // right arrow key
    // move across x axis to the right
    store.dispatch('moveToRight');
  }
});
