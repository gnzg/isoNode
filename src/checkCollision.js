import { pointInRhombus } from './math';
import state from './store/state';
import store from './store/index';

// checks whether the current mouse coordinates fall within saved hitboxes of non-zero tiles
// by comparing the position of the cursor with each tile hitbox saved in the global state

// arguments:
// receives e as the pointer move event {object}, an array of tile coordinates [{x,y}] and the store {object}
// returns void
export default e => {
    let tileCoordinates = state.env.tileHitBoxes;
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

            let tile = {
                x: tileCoordinates[i].x,
                y: tileCoordinates[i].y
            };
            
            // console.log("inside tile at position", "y", tile.y, "x", tile.x);
            /* pass the coordinates of the tile respective to the maps object to manipulate it further */
            
            store.dispatch("tileHovered", tile);
            return true;
        }
        // if outside of all hitboxes and
        // a previous tile was hovered 
        else if (state.env.lastHoveredTile.x !== undefined) {
            // only perform if prevTile.i has been hovered previously
            store.dispatch("tileNotHovered", state.env.lastHoveredTile);
        }
    }
}