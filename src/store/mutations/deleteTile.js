import store from '../index';

/*
Deletes a tile from the map matrix and updates the canvas afterwards
*/
/**
 * 
 * @param {*} state 
 * @param array payload 
 */
export default function deleteTile(state, payload = [0,0,0]) {
    let x = payload[0];
    let y = payload[1]; 
    let z = payload[2];
    state.env.maps[z][y][x] = 0;
    store.dispatch('renderTiles');
}