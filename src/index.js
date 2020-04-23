import { floatText } from './utils';
import store from './store/index';
import canvasWrapper from './components/canvasWrapper';
import './assets/scss/styles.scss';

const canvasWrapperInstance = new canvasWrapper('main');
let hint = new Object;

window.addEventListener("resize", () => {
  store.state.env.winWidth = window.innerWidth;
  store.state.env.winHeight = window.innerHeight;
  store.dispatch('centerCanvas');
  store.dispatch('renderTiles');
});
// Rotate or move canvas on key(s) down
window.addEventListener("keydown", e => {
  // no friggin' event bubbling
  e.stopImmediatePropagation();
  if (e.keyCode in store.state.keyMap) {
    store.state.keyMap[e.keyCode] = true;
  }
  if (
    e.keyCode === 37 ||
    e.keyCode === 38 ||
    e.keyCode === 39 ||
    e.keyCode === 40 ||
    e.keyCode === 68 ||
    e.keyCode === 65 ||
    e.keyCode === 87 ||
    e.keyCode === 83 ||
    e.keyCode === 82
    ) {
      store.dispatch('handleKeyDown', store.state.keyMap);
    }
  });
  
  window.addEventListener("keyup", e => {
    e.stopImmediatePropagation();
    let keyMapState = store.state.keyMap;
    if (e.keyCode in store.state.keyMap) keyMapState[e.keyCode] = false;
    store.dispatch('handleKeyUp', keyMapState);
    hint.hide();
  });
  
  window.addEventListener("mousemove", e => {
    //console.log('x:', e.clientX, 'y:', e.clientX);
  })
  
  // main initialization
  window.addEventListener("DOMContentLoaded", e => {
    // no friggin' event bubbling
    e.stopImmediatePropagation();
    store.dispatch('centerCanvas');
    store.dispatch('renderTiles');
    hint = new floatText(store.state.ctx, 'Press R to rotate the canvas');
    setTimeout(() => { hint.display(); }, 3000);
  });