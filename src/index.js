import floatText from './floatText.js';
import store from './store/index';
import canvasWrapper from './components/canvasWrapper';
import './assets/scss/styles.scss';
import { dotProduct, crossProduct, pointInRhombus } from './math.js';

// Initialization
window.addEventListener("DOMContentLoaded", e => {
  
  // Events
  window.addEventListener("resize", () => {
    store.state.env.winWidth = window.innerWidth;
    store.state.env.winHeight = window.innerHeight;
    store.dispatch('centerCanvas');
    store.dispatch('renderTiles');
  });
  
  // Rotate or move canvas on key(s) down
  window.addEventListener("keydown", e => {
    // prevent event bubbling
    e.stopImmediatePropagation();
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
        store.dispatch('handleKeyDown', store.state.keyMap);
      }
    });
    
    window.addEventListener("keyup", e => {
      e.stopImmediatePropagation();
      let keyMapState = store.state.keyMap;
      if (e.keyCode in store.state.keyMap) keyMapState[e.keyCode] = false;
      store.dispatch('handleKeyUp', keyMapState);
      //hint.hide();
      if (e.keyCode === 82)     // R key
      {
        store.dispatch('rotateMapAction');
      }
    });
    
    window.addEventListener("mousemove", e => {
      
      let pointA = store.state.env.tileHitBoxes[0].pointA;
      let pointB = store.state.env.tileHitBoxes[0].pointB;
      let pointC = store.state.env.tileHitBoxes[0].pointC;
      let pointD = store.state.env.tileHitBoxes[0].pointD;
      
      pointInRhombus(pointA,pointB,pointC,pointD, {x:e.clientX, y:e.clientY});
    });
    
    // prevent event bubbling
    e.stopImmediatePropagation();
    
    const canvasWrapperInstance = new canvasWrapper('main');
    store.dispatch('centerCanvas');
    store.dispatch('renderTiles');
    //let hint = new floatText(store.state.ctx, 'Press R to rotate the canvas');
    //setTimeout(() => { hint.display(); }, 3000);
    
    // Trigger actions via browser console
    window.store = store;
  });