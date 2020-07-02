export default function saveLastHoveredTile(state, payload) {
    let tile = payload;
    state.env.lastHoveredTile = tile;
}
