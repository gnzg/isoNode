import store from "../index";
import rotateMap from "./rotateMap";

export default function handleKeyDown(state, payload) {
  let key = payload;
  if (key in store.state.keyMap) {
    state.keyMap[key] = true;
    if (state.map_data.tileHitBoxes.length != 0) {
      store.dispatch("clearTileHitBoxes");
    }
    if (state.keyMap["ArrowRight"] || state.keyMap["d"]) {
      state.map_data.map_offset_x += state.acceleration;
    } else if (state.keyMap["ArrowLeft"] || state.keyMap["a"]) {
      state.map_data.map_offset_x -= state.acceleration;
    }
    if (state.keyMap["ArrowUp"] || state.keyMap["w"]) {
      state.map_data.map_offset_y -= state.acceleration;
    } else if (state.keyMap["ArrowDown"] || state.keyMap["s"]) {
      state.map_data.map_offset_y += state.acceleration;
    }
    if (state.keyMap["r"]) {
      store.dispatch("rotateMap");
    }
    store.dispatch("updateCanvas");
  }
  return state;
}
