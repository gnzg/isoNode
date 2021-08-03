export default function saveLastHoveredTile(state, payload : { x: number; y: number; }) {
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
