import { pointInRhombus } from './math';
import state from '../store/state';
import store from '../store/index';

// checks whether the current mouse coordinates fall within saved hitboxes of non-zero tiles
// by comparing the position of the cursor with each tile hitbox saved in the global state


export default event => {
    // TODO: check collision only if within map dimensions
    //console.log('mouse move - checking tile collision');
    
    let tileCoordinates = state.env.tileHitBoxes;
    for (let i = 0; i < tileCoordinates.length; i++) {
        
        // tileCoordinates[tileN]{x,y}
        let rhombus = tileCoordinates[i];
        let tilePos;
        
        
        // if mouse within constraints of tile
        if (pointInRhombus(rhombus, {x: event.clientX, y: event.clientY})) {
            
            tilePos = {
                x: tileCoordinates[i].x,
                y: tileCoordinates[i].y
            };
            // console.log('tilePos.x', tilePos.x);
            //console.log('currently hovering tile', tilePos.x, tilePos.y);
            
            // if no tile was previously hovered
            if (state.env.lastHoveredTile.x === undefined) {
                //write currently hovered tile to global state
                store.dispatch("tileHovered", tilePos);
                store.dispatch("saveLastHoveredTile", tilePos);
                store.dispatch('refreshCanvas');
            }
            // if hovering same tile, do nothing
            else if (tilePos.x === state.env.lastHoveredTile.x && tilePos.y === state.env.lastHoveredTile.y) {
                //store.dispatch("tileHovered", tilePos);
            }
            // if hovering a new tile
            else if (tilePos.x !== state.env.lastHoveredTile.x || tilePos.y !== state.env.lastHoveredTile.y) {
                console.log('UNhovering tile:', state.env.lastHoveredTile.x, state.env.lastHoveredTile.y);
                store.dispatch("tileNotHovered", state.env.lastHoveredTile);
                store.dispatch("tileHovered", tilePos);
                store.dispatch('refreshCanvas');
            }
            // exit for loop
            return true;
        }
        // TODO: if not currently hovering any tiles
        else {
            //console.log('Not hovering ANY tiles');
        }
    }
};