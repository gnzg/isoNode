import store from "../index";

export default (state, payload: { x: number; y: number }) => {
    if (state.map_data.map_tiles === undefined) {
        store.dispatch("error", "state.map_data.map_tiles is invalid!");
        return state;
    }

    state.cursorInMap = true;

    // save original tile type
    state.map_data.lastHoveredTileType =
        state.map_data.map_tiles[payload.y][payload.x];

    // set tile type for hovered tile
    state.map_data.map_tiles[payload.y][payload.x] = 4;
    return state;
};
