import store from '../index';

export default function tileNotHovered(state, payload) {
    //onsole.log('tileHovered() tile', payload);

    let tile = payload;

    /*
    state.ctx.fillStyle = "red"
        
    // top
    state.ctx.globalCompositeOperation = 'source-over';
    state.ctx.beginPath();
    state.ctx.moveTo(tile.pointA.x, tile.pointA.y);
    state.ctx.lineTo(tile.pointB.x, tile.pointB.y);
    state.ctx.lineTo(tile.pointC.x, tile.pointC.y);
    state.ctx.lineTo(tile.pointD.x, tile.pointD.y);
    state.ctx.closePath();
    state.ctx.fill();
    */

    state.env.maps[tile.y][tile.z][tile.x] = 2;

    // TODO: avoid re-drawing the entire canvas if pointer moves within hitbox
    store.dispatch('renderTiles');
};