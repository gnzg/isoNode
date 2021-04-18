export default function saveLastHoveredTile(state, payload) {
    let tile = payload;
    console.log('tile', tile);
    state.env.lastHoveredTile = tile;
}
