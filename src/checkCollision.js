import { pointInRhombus } from './math';

// receives e as the pointer move event {object}, the current tile coords [x,y] and the store {object}
// returns void
export default (e, tileCoordinates, store) => {
    for (let i = 0; i < tileCoordinates.length; i++) {
        let pointA = tileCoordinates[i].pointA;
        let pointB = tileCoordinates[i].pointB;
        let pointC = tileCoordinates[i].pointC;
        let pointD = tileCoordinates[i].pointD;
        
        // pointA is minimum x reference
        // pointB is minimum y reference
        
        // if mouse within constraints of tile
        if (pointInRhombus(pointA,pointB,pointC,pointD, {x:e.clientX, y:e.clientY})) {
            // console.log("Hovering a tile!", tile);
            
            /* pass the coordinates of the tile respective to the maps object to manipulate it further */
            let tile = { 
                x: tileCoordinates[i].x,
                y: tileCoordinates[i].y
            };
            // console.log('tile', tile);
            
            store.dispatch("tileHovered", tile);
            
            //write last hovered tile to global state
            store.dispatch("saveLastHoveredTile", tile);
            return true;
        }
        // if not hovering a tile, and if the last hovered tile has not yet been cleaned from the global state
        else if (store.state.env.lastHoveredTile.x !== undefined) {
            // only perform if prevTile.i has been hovered previously
            store.dispatch("tileNotHovered", store.state.env.lastHoveredTile);
        }
    }
}