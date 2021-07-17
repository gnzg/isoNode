import store from "../index";

export default function tileNotHovered(state, payload) {
  if (state.env.map_tiles !== undefined) {
    let tile = payload;

    state.env.map_tiles[tile.y][tile.x] = 2;

    // reset all hovered tiles
    let tileCoordinates = state.env.tileHitBoxes;
    for (let i = 0; i < tileCoordinates.length; i++) {
      state.env.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] = 2;
    }

    // reset last hovered tile
    state.env.lastHoveredTile = {};
  } else {
    store.dispatch("error", "state.env.map_tiles is invalid!");
  }
}
