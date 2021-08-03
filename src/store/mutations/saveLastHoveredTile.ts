export default function saveLastHoveredTile(state, payload : { x: number; y: number; }) {
    console.log("No longer hovering tile:", state.env.lastHoveredTile.x, state.env.lastHoveredTile.y);

    console.log('payload', payload.x, payload.y);
    if (payload.x || payload.y === undefined) {
        console.log("Error - saveLastHoveredTile payload is empty!");
        return state;
    }
    state.env.lastHoveredTile = {
        x: payload.x,
        y: payload.y
    };
    return state;
}
