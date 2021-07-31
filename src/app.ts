import './assets/scss/styles.scss';
import store from './store/index';
import CanvasWrapper from './store/canvasWrapper';
import UserInput from './utilities/userInput';

// ts: Extend the global Window interface
declare global {
  interface Window {
    store: object,
    state: object
  }
}

// Initialization
window.addEventListener("DOMContentLoaded", e => {

  let canvasWrapper = new CanvasWrapper('main');
  canvasWrapper.initialize();

  store.dispatch("centerCanvas");
  store.dispatch("updateCanvas");
  store.dispatch("createTileHitBoxes");
  
  let userInput = new UserInput();
  userInput.activate();

  // Access store and state via window object
  window.store = store;
  window.state = store.state;
  e.stopImmediatePropagation();
});

window.addEventListener("mousemove", e => {
  store.dispatch("checkCollision", e);
  console.log("x:", e.clientX, "y:", e.clientY);
});
