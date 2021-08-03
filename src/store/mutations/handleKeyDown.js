import store from '../index';

export default function handleKeyDown (state, payload) {
  let key = payload;
  
  if (key in store.state.keyMap) {
    state.keyMap[key] = true;
    
    if (state.env.tileHitBoxes.length != 0) {
      store.dispatch("clearTileHitBoxes");
    }
    
    // should not be handled by global state
    if (state.keyMap["ArrowRight"] || state.keyMap["d"]) {
      state.env.map_offset_x += state.acceleration;
    }
    else if (state.keyMap["ArrowLeft"] || state.keyMap["a"]) {
      state.env.map_offset_x -= state.acceleration;
    }
    if (state.keyMap["ArrowUp"] || state.keyMap["w"]) {
      state.env.map_offset_y -= state.acceleration;
    }
    else if (state.keyMap["ArrowDown"] || state.keyMap["s"]) {
      state.env.map_offset_y += state.acceleration;
    }
    store.dispatch('updateCanvas');
  }
  return state;
}