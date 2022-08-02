export default function saveCurrentlyHoveredTile(
    state,
    payload: { x: number; y: number }
) {
    if (payload.x && payload.y === undefined) {
        console.debug("Error - saveCurrentlyHoveredTile payload is empty!");
        return state;
    }
    state.map_data.currentlyHoveredTile = {
        x: payload.x,
        y: payload.y,
    };
    return state;
}
