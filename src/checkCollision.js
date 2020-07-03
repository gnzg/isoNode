import { pointInRhombus } from './math';

// receives e as the pointer move event {object}, the current tile coords [array] and the store {object}
// returns void
export default (e, tileCoordinates, store) => {
    e.stopImmediatePropagation();
    // coordinates of all tiles
    // tileCoordinates
    
    // check within which hitbox the mouse is
    //if (e.clientX) {
    // pointA is minimum x reference
    // pointB is minium y reference
    //}
    
    
    // REFACTOR the check here as it gives false negatives
    for (let i = 0; i < tileCoordinates.length; i++) {
        let pointA = tileCoordinates[i].pointA;
        let pointB = tileCoordinates[i].pointB;
        let pointC = tileCoordinates[i].pointC;
        let pointD = tileCoordinates[i].pointD;
        
        // if mouse within constraints of tile
        if (pointInRhombus(pointA,pointB,pointC,pointD, {x:e.clientX, y:e.clientY})) {
            //console.log("Hovering a tile!", tile);
            
            /* pass the coordinates of the tile respective to the maps object to manipulate it further */
            let tile = { 
                y: tileCoordinates[i].y,
                x: tileCoordinates[i].x,
                z: tileCoordinates[i].z
            };
            
            //let prevTile = {};
            // write current tile coordinates to temporary object
            //Object.defineProperty(prevTile, i, { value: tile });
            //Object.getOwnPropertyDescriptor(prevTile, i).value;
            
            store.dispatch("tileHovered", tile);
            
            // write last hovered tile to global state
            //    prevTile => {
            //    store.dispatch("saveLastHoveredTile", prevTile);
        }
        /*
        else {
            console.log('Not hovering a tile.');
            // only perform if prevTile.i has been hovered previously
            console.log('last saved hovered tile', store.state.env.lastHoveredTile);
            //if (store.state.env.lastHoveredTile) store.dispatch("saveLastHoveredTile", store.state.env.lastHoveredTile);
        }*/
    }
}