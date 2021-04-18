import store from '../index';

export default function tileNotHovered(state, payload) {
    let tile = payload;
   
    state.env.map[tile.y][tile.x] = 2;

    // if lost track of last hovered tile, reset last saved hovered tile
    if (tile.x === undefined || tile.y === undefined) {
        state.env.map[lastHoveredTile.y][lastHoveredTile.x] = 2;
    }
    
    // reset last hovered tile
    state.env.lastHoveredTile = {};
}