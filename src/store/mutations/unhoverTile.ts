import store from "../index";

export default function unhoverTile(state, payload : { y: number, x: number } ) {
  if (state.env.map_tiles !== undefined && payload.y && payload.x) {
    let tileCoordinates = state.env.tileHitBoxes;

    state.env.map_tiles[payload.y][payload.x] = state.env.lastHoveredTileType;

    // reset all hovered tiles
    for (let i = 0; i < tileCoordinates.length; i++) {
      state.env.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] = state.env.lastHoveredTileType;
    }
  } else {
    console.log("Error: state.env.map_tiles is invalid!");
  }
  return state;
}
