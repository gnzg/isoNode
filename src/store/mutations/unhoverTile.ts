import map from '../../maps/map0';

export default function unhoverTile(state, payload : { y: number, x: number } ) {
  if (state.env.map_tiles !== undefined && payload.y !== undefined && payload.x !== undefined) {
    let tileCoordinates = state.env.tileHitBoxes;

    state.env.map_tiles[payload.y][payload.x] = state.env.lastHoveredTileType;

    // reset all hovered tiles based on original map layout
    for (let i = 0; i < tileCoordinates.length; i++) {
      state.env.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] = map.tiles[tileCoordinates[i].y][tileCoordinates[i].x];
    }
  } else {
    console.log("Error: state.env.map_tiles is invalid!");
  }
  return state;
}
