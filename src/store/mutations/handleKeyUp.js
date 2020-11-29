import store from '../index';
import { areAllObjectPropsFalse } from '../../helpers/utils';

export default function handleKeyUp (state, payload) {
  
  let key = payload;
  
  // go further only if a relevant key is registered
  if (key in store.state.keyMap) {
    store.state.keyMap[key] = false;
    
    // if all all user input keys have been unregistered, do...
    if (areAllObjectPropsFalse(state.keyMap)) {
      state.acceleration = 0;  
      store.dispatch('refreshCanvas');
      store.dispatch("createTileHitBox");
    }
  }
}