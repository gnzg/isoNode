import store from '../index';

export default function tileNotHovered(state, payload) {
    let tile = payload;
   
    state.env.map[tile.y][tile.x] = 2;

    // reset all hovered tiles
    let tileCoordinates = state.env.tileHitBoxes;
    for (let i = 0; i < tileCoordinates.length; i++) {
        state.env.map[tileCoordinates[i].y][tileCoordinates[i].x] = 2;
    }
    
    // reset last hovered tile
    state.env.lastHoveredTile = {};
}