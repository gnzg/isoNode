import { pointInRhombus } from './math';
import state from './store/state';
import store from './store/index';

// checks whether the current mouse coordinates fall within saved hitboxes of non-zero tiles
// by comparing the position of the cursor with each tile hitbox saved in the global state

// arguments:
// receives e as the pointer move event {object}, an array of tile coordinates [{x,y}] and the store {object}
// returns void
export default (e) => {
    
    //console.log(e.clientX, e.clientY);
    
    // TODO: check if tile is non-zero before creating a hit box for it
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
            
            /* pass the coordinates of the tile respective to the maps object to manipulate it further */
            
            //store.dispatch("tileHovered", tile);
            
            //write last hovered tile to global state
            store.dispatch("saveLastHoveredTile", tile);
            return true;
        }
        // if not hovering a tile, and if the last hovered tile has not yet been cleaned from the global state
        else if (state.env.lastHoveredTile.x !== undefined) {
            // only perform if prevTile.i has been hovered previously
            store.dispatch("tileNotHovered", state.env.lastHoveredTile);
            //('state.env.lastHoveredTile', state.env.lastHoveredTile);
        }
    }
}