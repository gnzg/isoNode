import store from '../store/index';

// user input
export default class UserInput {
  activate() {
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
        }
        // SPACE key
        else if (e.key ==  " ") {
          // rotates map and re-draws the canvas
          // store.dispatch('rotateMapAction');
        }
      });
      
      window.addEventListener("keyup", e => {
        e.stopImmediatePropagation();
        store.dispatch('handleKeyUp', e.key);
      });
      
      window.addEventListener("resize", () => {
        store.state.env.winWidth = window.innerWidth;
        store.state.env.winHeight = window.innerHeight;
        store.dispatch('centerCanvas');
        store.dispatch('refreshCanvas');
      });
    }
  }