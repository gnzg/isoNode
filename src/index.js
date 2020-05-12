import floatText from './floatText.js';
import store from './store/index';
import canvasWrapper from './components/canvasWrapper';
import './assets/scss/styles.scss';
import { pointInRhombus, pointInHexagon } from './math.js';

// Initialization
window.addEventListener("DOMContentLoaded", e => {
  
  // prevent event bubbling
  e.stopImmediatePropagation();
  
  const canvasWrapperInstance = new canvasWrapper('main');
  store.dispatch('centerCanvas');
  store.dispatch('renderTiles');
  
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
        
        // if movement takes place, clear the tile hitboxes // TODO: make prettier
        store.state.env.tileHitBoxes = [];
        
      }
    });
    
    window.addEventListener("keyup", e => {
      e.stopImmediatePropagation();
      let keyMapState = store.state.keyMap;
      if (e.keyCode in store.state.keyMap) keyMapState[e.keyCode] = false;
      store.dispatch('handleKeyUp', keyMapState);
      //hint.hide();
      
      // R key
      if (e.keyCode === 82) {
        store.dispatch('rotateMapAction');
      }
      
      // if movement takes place, clear the tile hitboxes // TODO: make prettier
      store.state.env.tileHitBoxes = [];
      
      
      // the below also includes implicitly rebuilding the hit box array (but not clearing the old array yet!)
      checkCollision(e, store.state.env.tileHitBoxes);
      
    });
    
    let checkCollision = (e, tileCoordinates) => {
      for (let i = 0; i < tileCoordinates.length; i++) {
        let pointA = tileCoordinates[i].pointA;
        let pointB = tileCoordinates[i].pointB;
        let pointC = tileCoordinates[i].pointC;
        let pointD = tileCoordinates[i].pointD;
        
        //pointInHexagon(pointA, pointB);
        
        if (pointInRhombus(pointA,pointB,pointC,pointD, {x:e.clientX, y:e.clientY})) {
          /* pass the coordinates of the tile respective to the maps object to manipulate it further */
          let tile = { 
            y: tileCoordinates[i].y,
            z: tileCoordinates[i].z,
            x: tileCoordinates[i].x
          };
          console.log("Interaction with tile!", tile);
          store.dispatch("tileHovered", tile);
          store.dispatch('renderTiles');
          
          // avoid having the condition loop if it is fulfilled
          return true;
          
        } else {
          // store.dispatch("tileNotHovered", tileCoordinates[i]);
        }
      }
    }
    
    window.addEventListener("mousemove", e => {
      
      checkCollision(e, store.state.env.tileHitBoxes);
      
    });
    
    //let hint = new floatText(store.state.ctx, 'Press R to rotate the canvas');
    //setTimeout(() => { hint.display(); }, 3000);
    
    // Trigger actions via browser console
    window.store = store;
  });