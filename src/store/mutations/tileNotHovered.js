import store from "../index";

export default function tileNotHovered(state, payload) {
  if (state.env.map_tiles !== undefined) {
    let tile = payload;
    let tileCoordinates = state.env.tileHitBoxes;

    state.env.lastHoveredTileType = state.env.map_tiles[tile.y][tile.x];
    state.env.map_tiles[tile.y][tile.x] = 2;

    // reset all hovered tiles
    for (let i = 0; i < tileCoordinates.length; i++) {
      state.env.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] = state.env.lastHoveredTileType;
    }
    // reset last hovered tile
    state.env.lastHoveredTile = {};
  } else {
    store.dispatch("error", "state.env.map_tiles is invalid!");
  }
}
