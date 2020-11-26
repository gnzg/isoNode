import store from '../store/index';
import checkCollision from '../math/checkCollision';

// user input
export default class UserInput {
  constructor(windowObject) {
    this.window = windowObject
  }
  activate() {
    //alert(this.window);
    // Rotate or move canvas on key(s) down
    window.addEventListener("keydown", e => {
      // prevent event bubbling
      e.stopImmediatePropagation();
      // TODO: smooth out map movements
      
      if (e.key in store.state.keyMap) {
        store.state.keyMap[e.key] = true;
      }
      if (
        e.key == "ArrowLeft" ||       
        e.key == "ArrowUp" ||
        e.key == "ArrowRight" ||
        e.key == "ArrowDown" ||
        e.key == "d" ||
        e.key == "a" ||
        e.key == "w" ||
        e.key == "s"
        ) {
          // Allow multiple keys to be registered, e.g. for diagonally moving the map
          store.dispatch('handleKeyDown', store.state.keyMap);
          store.dispatch("clearTileHitBoxes");
          // if movement takes place, clear the tile hitboxes // TODO: make prettier
          store.state.env.tileHitBoxes = [];
          
        }
        // SPACE key
        else if (e.key ==  " ") {
          // rotates map and re-draws the canvas
          // store.dispatch('rotateMapAction');
          alert("Space key pressed");
        }
      });
      
      window.addEventListener("keyup", e => {
        e.stopImmediatePropagation();
        
        store.dispatch("createTileHitBox");
        // deactivate any previously pressed keys
        let keyMapState = store.state.keyMap;
        if (e.key in store.state.keyMap) {
          keyMapState[e.key] = false;
        }
        store.dispatch('handleKeyUp', keyMapState);
        
        //hint.hide(); // TODO
        
        //checkCollision(e, store.state.env.tileHitBoxes, store);
      });
      
      window.addEventListener("mousemove", e => {
        e.stopImmediatePropagation();
        checkCollision(e);
      });
      
      window.addEventListener("resize", () => {
        store.state.env.winWidth = window.innerWidth;
        store.state.env.winHeight = window.innerHeight;
        store.dispatch('centerCanvas');
        store.dispatch('refreshCanvas');
      });
    }
  }