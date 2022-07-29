import './assets/scss/styles.scss';
import Store from './store/index';
import CanvasWrapper from './store/canvasWrapper';
import UserInput from './utilities/userInput';

// Extend the Window interface
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

  let userInput = new UserInput();
  userInput.activate();

  // Access store and state via window object
  //window.store = Store;
  //window.state = State;
  e.stopImmediatePropagation();
});

window.addEventListener("mousemove", e => {
  Store.dispatch("checkCollision", e);
});
