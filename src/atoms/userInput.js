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
  }
}