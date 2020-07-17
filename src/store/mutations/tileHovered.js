import store from '../index';

export default function tileHovered(state, payload) {
    let tile = payload;

    /*
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
    state.env.maps[tile.mapIndex][tile.y][tile.x] = 4;
    //console.log("y", tile.y, "z", tile.z, "x", tile.x,);
    
    // TODO: avoid re-drawing the entire canvas if pointer moves within hitbox
    store.dispatch('refreshCanvas');
};