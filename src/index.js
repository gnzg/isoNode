import {floatText} from './utils';
import store from './store/index';
import canvasWrapper from './components/canvasWrapper';
import './assets/scss/styles.scss';

const canvasWrapperInstance = new canvasWrapper('main');

window.addEventListener("DOMContentLoaded", () => {
  store.dispatch('centerCanvas');
  floatText(store.state.ctx, 'Press R to rotate the canvas');
});
window.addEventListener("resize", () => {
  store.state.env.winWidth = window.innerWidth; // TODO
  store.state.env.winHeight = window.innerHeight; // TODO
  store.dispatch('centerCanvas');
});
// Rotate or move canvas on key(s) down
window.addEventListener("keydown", e => {
  if (e.keyCode in store.state.keyMap) store.state.keyMap[e.keyCode] = true;
  
  //console.log(store.state.keyMap[68], store.state.keyMap[87]);

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
  // no friggin' event bubbling
  e.stopImmediatePropagation();
});
window.addEventListener("keyup", e => {
  //alert('asdasd');
  let keyMapState = store.state.keyMap;
  if (e.keyCode in store.state.keyMap) keyMapState[e.keyCode] = false;
  //alert('r is:', store.state.keyMap[82]);
  store.dispatch('handleKeyDown', keyMapState);
  e.stopImmediatePropagation();
});

window.addEventListener("mousemove", e => {
  //console.log(e.clientX);
})