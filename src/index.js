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
      
      // point a
      let pointA = store.state.env.tileHitBoxes[0].pointA;
      
      // point b
      let pointB = store.state.env.tileHitBoxes[0].pointB;
      
      // point c
      let pointC = store.state.env.tileHitBoxes[0].pointC;
      
      // calculate cross product (analog) based on two 2D vectors 
      // returns a scalar value
      let CrossProduct = (U,V) => {
        let CrossProductAnalog = (U.x*V.y-U.y*V.x);
        return CrossProductAnalog;
      }

      // calculate dot product of two 2D vectors via the algebraic definition
      // returns a scalar value
      let dotProduct = (U,V) => {
        let dotProduct = U.x * V.x + U.y * V.y;
        return dotProduct;
      }

      // takes 3 points [x,y] and an arbitrary point [x,y]
      // returns a boolean
      let PointInTriangle = (a,b,c,p) => {
        // Compute vectors        
        let v0 =  {x: c.x - a.x, y: c.y - a.y},
        v1 =      {x: b.x - a.x, y: b.y - a.y},
        v2 =      {x: p.x - a.x, y: p.y - a.y};
        
        // Compute dot products
        let dot00 = dotProduct(v0, v0),
        dot01 = dotProduct(v0, v1),
        dot02 = dotProduct(v0, v2),
        dot11 = dotProduct(v1, v1),
        dot12 = dotProduct(v1, v2);
        
        // Compute barycentric coordinates
        let invDenom = 1 / (dot00 * dot11 - dot01 * dot01),
        u = (dot11 * dot02 - dot01 * dot12) * invDenom,
        v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        
        // Check if point is in triangle
        return (u >= 0) && (v >= 0) && (u + v < 1);
      }
      console.log(PointInTriangle(pointA,pointB,pointC, {x:e.clientX, y:e.clientY}));
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