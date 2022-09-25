export default function saveLastHoveredTile(state, payload: { x: number; y: number }) {
    if (payload.x == undefined || payload.y == undefined) {
        console.debug("Error - saveLastHoveredTile payload is invalid!");
        return state;
    }
    state.map_data.lastHoveredTile = {
        x: payload.x,
        y: payload.y,
    };
    return state;
}
