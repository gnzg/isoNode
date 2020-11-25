import store from './store/index';
import './assets/scss/styles.scss';
import CanvasWrapper from './store/canvasWrapper';
import UserInput from './atoms/userInput';

// Initialization
window.addEventListener("DOMContentLoaded", e => {
  
  // prevent event bubbling
  e.stopImmediatePropagation();
  
  let canvasWrapper = new CanvasWrapper('main');
  canvasWrapper.initialize();
  
  let userInput = new UserInput(window);
  userInput.activate();
  
  // Access actions via browser console
  window.store = store;
});
