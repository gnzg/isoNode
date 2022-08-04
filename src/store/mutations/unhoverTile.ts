import map from "../../assets/maps/map0";

export default (state, payload: { x: number; y: number }) => {
    let tileCoordinates = { x: payload.x, y: payload.y };

    // reset all hovered tiles saved in global state
    // TODO: re-write; current approach is expensive
    /*
    for (let i = 0; i < tileCoordinates.length; i++) {
        state.map_data.map_tiles[tileCoordinates[i].y][tileCoordinates[i].x] =
            map.tiles[tileCoordinates[i].y][tileCoordinates[i].x];
    }*/

    // reset no longer hovered tile to original value
    state.map_data.map_tiles[tileCoordinates.x][tileCoordinates.y] = map.tiles[tileCoordinates.x][tileCoordinates.y];
    return state;
};
