import './assets/scss/styles.scss';
import Store from './store/index';
import State from './store/state';
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


  Store.dispatch("centerCanvas");
  Store.dispatch("updateCanvas");
  Store.dispatch("createTileHitBoxes");
  
  let userInput = new UserInput();
  userInput.activate();

  // Access store and state via window object
  window.store = Store;
  window.state = State;
  e.stopImmediatePropagation();
});

window.addEventListener("mousemove", e => {
  Store.dispatch("checkCollision", e);
  console.log("x:", e.clientX, "y:", e.clientY);
});
