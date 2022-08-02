export default function saveCurrentlyHoveredTile(state, payload: { x: number; y: number }) {
    if (payload.x === undefined || payload.y === undefined) {
        console.debug("Error - saveCurrentlyHoveredTile payload is invalid!");
        return state;
    }
    state.map_data.currentlyHoveredTile = {
        x: payload.x,
        y: payload.y,
    };
    return state;
}
