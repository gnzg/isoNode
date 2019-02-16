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
    // r key
    store.dispatch('rotateMap');
    canvasWrapperInstance.render();
  } else if (
    e.keyCode === 37 ||
    e.keyCode === 38 ||
    e.keyCode === 39 ||
    e.keyCode === 40 ||
    e.keyCode === 68 ||
    e.keyCode === 65 ||
    e.keyCode === 87 ||
    e.keyCode === 83
    ) {
    store.dispatch('moveMap', e.keyCode);
  }
});
