import floatText from './floatText.js';
import store from './store/index';
import canvasWrapper from './components/canvasWrapper';
import './assets/scss/styles.scss';

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

      let pointAx = store.state.env.tileHitBoxes[0].a.x;
      let pointAy = store.state.env.tileHitBoxes[0].a.y;
      let pointA = [pointAx, pointAy];

      let pointBx = store.state.env.tileHitBoxes[0].b.x;
      let pointBy = store.state.env.tileHitBoxes[0].b.y;
      let pointB = [pointBx, pointBy];

      // box center reference, i.e. "absolute zero" reference; point c
      let pointCx = store.state.env.tileHitBoxes[0].c.x;
      let pointCy = store.state.env.tileHitBoxes[0].c.y;
      let pointC = [pointCx, pointCy];

      // calculate cross product based on two 2D vectors 
      // and return a scalar value
      let CrossProduct = (U,V) => {
        let CrossProductAnalog = (U.x*V.y-U.y*V.x);
        return CrossProductAnalog;
      }
      
      // calculate whether p1 lies "on the same side" of vectors a and b
      // and return a boolean
      let sameSide = (p1, p2 = -p1, a, b) => {
        // TODO vector math utils
        /*
        let cp1 = CrossProduct(b-a, p1-a)
        let cp2 = CrossProduct(b-a, p2-a)
        if (DotProduct(cp1, cp2) >= 0) {
           return true;
        }
        else return false;
        */
      }

      let PointInTriangle = (p, a,b,c) => {
        if (sameSide(p,a,b,c) && sameSide(p,b,a,c) && sameSide(p,c,a,b)) {
          return true;
        } 
        else return false;
      }
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