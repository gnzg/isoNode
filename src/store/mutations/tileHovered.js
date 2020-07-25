import store from '../index';

export default function tileHovered(state, payload) {
    let tile = payload;

    state.env.map[tile.y][tile.x] = 4;
    
    // TODO: avoid re-drawing the entire canvas if pointer moves within hitbox
    store.dispatch('refreshCanvas');
};