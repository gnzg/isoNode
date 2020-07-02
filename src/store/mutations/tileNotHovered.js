import store from '../index';

export default function tileNotHovered(state, payload) {

    let tile = payload;
    console.log('tile', tile);
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
    // second parameter provides constraints within which the map should be refreshed 
    store.dispatch('refreshCanvas');
};