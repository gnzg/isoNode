import store from './store/index';
import './assets/scss/styles.scss';
import checkCollision from './checkCollision.js';
import canvasWrapper from './components/canvasWrapper';

// Initialization
window.addEventListener("DOMContentLoaded", e => {
  
  // prevent event bubbling
  e.stopImmediatePropagation();
  
  new canvasWrapper('main');
  
  store.dispatch('centerCanvas');
  store.dispatch('refreshCanvas');
  store.dispatch("createTileHitBox");
  
  // Events
  window.addEventListener("resize", () => {
    store.state.env.winWidth = window.innerWidth;
    store.state.env.winHeight = window.innerHeight;
    store.dispatch('centerCanvas');
    store.dispatch('refreshCanvas');
  });
  
  // Rotate or move canvas on key(s) down
  window.addEventListener("keydown", e => {
    // prevent event bubbling
    e.stopImmediatePropagation();
    
    // TODO: smooth out map movements
    
    if (e.keyCode in store.state.keyMap) {
      store.state.keyMap[e.keyCode] = true;
    }
    if (
      e.keyCode === 37 ||       // left arrow key
      e.keyCode === 38 ||       // up arrow key
      e.keyCode === 39 ||       // right arrow key
      e.keyCode === 40 ||       // down arrow key
      e.keyCode === 68 ||       // D key
      e.keyCode === 65 ||       // A key
      e.keyCode === 87 ||       // W key
      e.keyCode === 83          // S key
      ) {
      // Allow multiple keys to be registered, e.g. for diagonally moving the map
        store.dispatch('handleKeyDown', store.state.keyMap);
        store.dispatch("clearTileHitBoxes");
        // if movement takes place, clear the tile hitboxes // TODO: make prettier
        store.state.env.tileHitBoxes = [];
        
      }
      else if (e.keyCode === 32) {    // SPACE key
        // rotates map and re-draws the canvas
        // store.dispatch('rotateMapAction');
      }
    });
    
    window.addEventListener("keyup", e => {
      e.stopImmediatePropagation();
      
      store.dispatch("createTileHitBox");
      // deactivate any previously pressed keys
      let keyMapState = store.state.keyMap;
      if (e.keyCode in store.state.keyMap) {
        keyMapState[e.keyCode] = false;
      }
      store.dispatch('handleKeyUp', keyMapState);
      
      //hint.hide(); // TODO
      
      //checkCollision(e, store.state.env.tileHitBoxes, store);
    });
    
    window.addEventListener("mousemove", e => {
      e.stopImmediatePropagation();
      checkCollision(e);
    });
    
  });
  
  // Access actions via browser console
  window.store = store;