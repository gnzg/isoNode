import store from '../index';
/**
* Deletes a tile from the map matrix and updates the canvas afterwards
* 
* @param {*} state 
* @param array payload 
*/
export default function deleteTile(state, payload) {
    let y = payload[0]; 
    let z = payload[1];
    let x = payload[2];
    state.env.maps[y][z][x] = 0;
    store.dispatch('refreshCanvas');
}