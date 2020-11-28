import store from './store/index';
import './assets/scss/styles.scss';
import CanvasWrapper from './store/canvasWrapper';
import UserInput from './atoms/userInput';
import Events from './atoms/events';

// Initialization
window.addEventListener("DOMContentLoaded", () => {
  
  let canvasWrapper = new CanvasWrapper('main');
  canvasWrapper.initialize();
  
  let userInput = new UserInput();
  userInput.activate();

  let events = new Events();
  events.activateHitBoxes();
  
  // Access actions via browser console
  window.store = store;
});
