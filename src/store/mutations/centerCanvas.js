import store from "../store";

export default function centerCanvas(state) {
  console.log("Window resized! Centering canvas...");

  if (state.env.map_tiles !== undefined && Array.isArray(state.env.map_tiles)) {
    let mapCenter =
      (state.env.map_tiles.length / 2) * state.env.tileWidth * 2.3;
    state.env.map_offset_x = state.env.winWidth / 2 - mapCenter;
    state.env.map_offset_y = state.env.winHeight / 2;
    return state;
  }
  store.dispatchEvent("error", "Invalid state.env.map_tiles value!");
}
