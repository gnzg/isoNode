import './assets/scss/styles.scss';
import Store from './store/index';
import CanvasWrapper from './store/canvasWrapper';
import UserInput from './utilities/userInput';
import Events from './objects/events';

// ts: Extend the global Window interface
declare global {
  interface Window {
    store: object,
    state: object
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
  window.store = Store;
  window.state = Store.state;
});
