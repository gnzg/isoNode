import store from './store/index';
import './assets/scss/styles.scss';
import CanvasWrapper from './store/canvasWrapper';
import UserInput from './atoms/userInput';
import Events from './atoms/events';

// ts: Extend the global Window interface
declare global {
  interface Window {
    store: Object,
    state: Object
  }
}

// Initialization
window.addEventListener("DOMContentLoaded", () => {
  
  let canvasWrapper = new CanvasWrapper('main');
  canvasWrapper.initialize();
  
  let userInput = new UserInput();
  userInput.activate();

  let events = new Events();
  events.activateHitBoxes();
  events.refreshCanvasOnResize();
  
  // Access store and state via window object
  window.store = store;
  window.state = store.state;
});
