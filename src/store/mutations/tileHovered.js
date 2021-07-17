import store from "../index";

export default function tileHovered(state, payload) {
  if (state.env.map_tiles !== undefined) {
    let tile = payload;

    state.env.map_tiles[tile.y][tile.x] = 4;
  } else {
    store.dispatch("error", "state.env.map_tiles is invalid!");
  }
}
