import map from "../../assets/maps/map0";

export default function unhoverTile(state, payload: { y: number; x: number }) {
    let tileCoordinates = state.map_data.tileHitBoxes;

    state.map_data.map_tiles[payload.y][payload.x] =
        state.map_data.lastHoveredTileType;

    // reset all hovered tiles saved in global state
    // TODO: re-write; current approach is expensive
    for (let i = 0; i < tileCoordinates.length; i++) {
        state.map_data.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] =
            map.tiles[tileCoordinates[i].y][tileCoordinates[i].x];
    }
    return state;
}
