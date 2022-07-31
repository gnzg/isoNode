import map from '../../assets/maps/map0';

export default function unhoverTile(state, payload : { y: number, x: number } ) {
  if (state.map_data.map_tiles !== undefined && payload.y !== undefined && payload.x !== undefined) {
    let tileCoordinates = state.map_data.tileHitBoxes;

    state.map_data.map_tiles[payload.y][payload.x] = state.map_data.lastHoveredTileType;

    // reset all hovered tiles based on original map layout
    for (let i = 0; i < tileCoordinates.length; i++) {
      state.map_data.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] = map.tiles[tileCoordinates[i].y][tileCoordinates[i].x];
    }
  } else {
    console.log("Error: state.map_data.map_tiles is invalid!");
  }
  return state;
}
