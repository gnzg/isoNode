import refreshCanvas from './refreshCanvas';
import { areObjectPropsFalse } from '../../helpers/utils';
import store from '../index'

export default function handleKeyUp (state, payload) {
  
  state.acceleration = 0;  
  let key = payload;

  // deactivate any previously pressed keys
  let keyMapState = store.state.keyMap;
  if (key in store.state.keyMap) {
    keyMapState[key] = false;
  }

  store.dispatch("createTileHitBox");
  
  if (areObjectPropsFalse(state.keyMap)) {
    clearInterval(state.drawFrequency);
    //state.drawFrequency = null;
    console.log("Cleared key cooldown");
  }
  
  // if the draw timer has not stopped yet, stop it now
  else if (state.drawFrequency != null) {
    clearInterval(state.drawFrequency);
  }
  refreshCanvas(state);
  return state;
}