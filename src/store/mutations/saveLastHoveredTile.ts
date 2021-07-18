export default function saveLastHoveredTile(state, payload) {
    let tile_position : { x: number; y: number; } = {
        x: payload.x,
        y: payload.y
    };
    state.env.lastHoveredTile = tile_position;
}
