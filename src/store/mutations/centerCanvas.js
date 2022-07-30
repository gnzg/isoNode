import Store from "../index";

export default function (state) {
  if (state.map_data.map_tiles !== undefined && Array.isArray(state.map_data.map_tiles)) {

    let mapCenter = (state.map_data.map_tiles.length / 2) * state.map_data.tileWidth * 2.3;
    state.map_data.map_offset_x = state.map_data.winWidth / 2 - mapCenter;
    state.map_data.map_offset_y = state.map_data.winHeight / 2;
  }
  else {
    Store.dispatch("error", "Invalid state.map_data.map_tiles value!");
  }
  return state;
}
