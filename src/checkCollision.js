import { pointInRhombus } from './math';

// receives e as the pointer move event {object}, the current tile coords [array] and the store {object}
// returns void
export default (e, tileCoordinates, store) => {
    
    let prevTile = {};

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
            // write current tile coordinates to temporary object
            Object.defineProperty(prevTile, i, { value: tile });
            prevTile = Object.getOwnPropertyDescriptor(prevTile, i).value;
            store.dispatch("tileHovered", tile);

            // if hovering a tile, exit the execution of the checkCollision()
            // TODO: and return the hovered value
            console.log('hovering a tile!', tile);
            return tile => {
                store.dispatch("saveLastHoveredTile", tile);
            }
        } else {
            console.log('Not hovering a tile.');
            // only perform if prevTile.i has been hovered previously
            console.log('lastHoveredTile', store.state.env.lastHoveredTile);
            //if (store.state.env.lastHoveredTile) store.dispatch("saveLastHoveredTile", store.state.env.lastHoveredTile);
        }
    }
}