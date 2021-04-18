import store from '../index';

export default function tileHovered(state, payload) {
    let tile = payload;

    state.env.map[tile.y][tile.x] = 4;

}