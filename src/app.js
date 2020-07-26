import store from './store/index';
import './assets/scss/styles.scss';
import checkCollision from './checkCollision.js';
import canvasWrapper from './components/canvasWrapper';
import Tile from './tile';
import RhombusVertices from './RhombusVertices';

// Initialization
window.addEventListener("DOMContentLoaded", e => {
  
  // prevent event bubbling
  e.stopImmediatePropagation();
  
  const canvasWrapperInstance = new canvasWrapper('main');
  
  store.dispatch('centerCanvas');
  store.dispatch('refreshCanvas');
  


  // draw initial tile hitboxes creation
  let map = store.state.env.map;

  for (let y = 0; y < map.length; y++) {
    // j draws a row across the x axis
    for (let x = 0; x < map[y].length; x++) {
      // alert('x:' + x + ' y:' + y + ' mapIndex:' + mapIndex);
      let tile = new Tile({ y, x });
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices({tile, y, x});
      // build the hitboxes array, but only if the tile is non-zero
      store.dispatch("createTileHitBox", ({x, y, rhombusVertices}));
    }
  }
  window.tileHitBoxes = store.state.env.tileHitBoxes;
  // end of initial tile hitboxes creation
  



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
      else if (e.keyCode === 32) {    // SPACE key
        // rotates map and re-draws the canvas
        // store.dispatch('rotateMapAction');
      }
    });
    
    window.addEventListener("keyup", e => {
      e.stopImmediatePropagation();
      
      // Allow multiple keys to be registered, e.g. for diagonally moving the map
      let keyMapState = store.state.keyMap; // type: object
      if (e.keyCode in store.state.keyMap) keyMapState[e.keyCode] = false;
      store.dispatch('handleKeyUp', keyMapState);
      
      //hint.hide(); // TODO
      
      //checkCollision(e, store.state.env.tileHitBoxes, store);
    });
    
    window.addEventListener("mousemove", e => {
      e.stopImmediatePropagation();
      checkCollision(e);
    });
    
    //let hint = new floatText(store.state.ctx, 'Press R to rotate the canvas');
    //setTimeout(() => { hint.display(); }, 3000);
    
  });
  
  // Access actions via browser console
  window.store = store;