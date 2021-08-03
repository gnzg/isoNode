import store from "../index";

export default function hoverTile(state, payload : {x : number, y: number }) {
  if (state.env.map_tiles === undefined) {
    store.dispatch("error", "state.env.map_tiles is invalid!");
    return state;
  }

  state.cursorInMap = true;

  // save original tile type
  state.env.lastHoveredTileType = state.env.map_tiles[payload.y][payload.x];

  // set tile type for hovered tile
  state.env.map_tiles[payload.y][payload.x] = 4;
  return state;

}
