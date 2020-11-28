import store from '../index';
import { areAllObjectPropsFalse } from '../../helpers/utils';

export default function handleKeyUp (state, payload) {
  
  let key = payload;
  
  // deactivate any previously pressed keys
  if (key in store.state.keyMap) {
    store.state.keyMap[key] = false;
    //alert(key + " set to false");
  }
  // if all all user input keys have been unregistered, do...
  else if (areAllObjectPropsFalse(state.keyMap)) {
    state.acceleration = 0;  
    if (state.drawFrequency != null) {
      clearInterval(state.drawFrequency);
    }
    store.dispatch("createTileHitBox");
  }
  
  
  
  store.dispatch('refreshCanvas');

  //alert(JSON.stringify(state.keyMap));
  return state;
}