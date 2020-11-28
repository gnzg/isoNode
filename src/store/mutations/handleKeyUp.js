import store from '../index';
import { areAllObjectPropsFalse } from '../../helpers/utils';

export default function handleKeyUp (state, payload) {
  
  let key = payload;
  
  // if all all user input keys have been unregistered, do...
  if (areAllObjectPropsFalse(state.keyMap)) {
    state.acceleration = 0;  
    if (state.drawFrequency != null) {
      clearInterval(state.drawFrequency);
    }
    store.dispatch("createTileHitBox");
  }
  
  // deactivate any previously pressed keys
  else if (key in store.state.keyMap) {
    store.state.keyMap[key] = false;
  }
  // if the draw timer has not stopped yet, stop it now
  
  store.dispatch('refreshCanvas');
  return state;
}