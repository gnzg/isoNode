import store from '../index';

export default function tileNotHovered(state, payload) {
    let tile = payload;
   
    state.env.map[tile.y][tile.x] = 2;
    
    // reset last hovered tile
    state.env.lastHoveredTile = {};

    // TODO: avoid re-drawing the entire canvas if pointer moves within hitbox
    store.dispatch('refreshCanvas');
}