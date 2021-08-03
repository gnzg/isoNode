import store from "../index";

export default function tileHovered(state, payload) {
  if (state.env.map_tiles === undefined) {
    store.dispatch("error", "state.env.map_tiles is invalid!");
    return state;
  }

  let tile = payload;

  state.cursorInMap = true;

  // save original tile type
  state.env.lastHoveredTileType = state.env.map_tiles[tile.y][tile.x];

  state.env.map_tiles[tile.y][tile.x] = 4;
  return state;

}
