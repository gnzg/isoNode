import store from '../store/index';

// user input
export default class UserInput {
  activate() {
    // Rotate or move canvas on key(s) down
    window.addEventListener("keydown", e => {
      // prevent event bubbling
      e.stopImmediatePropagation();
      
      store.dispatch('handleKeyDown', e.key);
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