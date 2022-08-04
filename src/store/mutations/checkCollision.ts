import StateInterface from "../../interfaces/StateInterface";
import pointInRhombus from "../../math/PointInRhombus";
import store from "../index";

// check whether cursor coordinates fall within saved hitboxes of non-empty tiles

export default (state: StateInterface, payload: MouseEvent) => {
    // initial check if required hitboxes exist
    if (state.map_data.tileHitBoxes.length <= 0) {
        console.warn("tileHitBoxes length is zero! Recreating...");
        store.dispatch("createTileHitBoxes");
    }

    let cursor_pos_x = payload.clientX;
    let cursor_pos_y = payload.clientY;
    let tileHitBoxes = state.map_data.tileHitBoxes;

    // TODO: re-write; current approach is expensive
    for (let i = 0; i < tileHitBoxes.length; i++) {
        // if cursor is within a given tile's space
        if (pointInRhombus(tileHitBoxes[i], { x: cursor_pos_x, y: cursor_pos_y })) {
            let hoveredTile = {
                x: tileHitBoxes[i].x,
                y: tileHitBoxes[i].y,
            };

            console.warn("hovering a tile!");

            // console.log("hoveredTile", hoveredTile);
            store.dispatch("saveCurrentlyHoveredTile", hoveredTile);
            store.dispatch("saveLastHoveredTile", hoveredTile);

            store.dispatch("onTileHover", state.map_data.currentlyHoveredTile);
            store.dispatch("updateCanvas");
            store.dispatch("saveLastHoveredTile", state.map_data.currentlyHoveredTile);
        }
        // if leaving hovered tile
        else if (!pointInRhombus(tileHitBoxes[i], { x: cursor_pos_x, y: cursor_pos_y })) {
            let execFlag = false;
            if (execFlag == false && state.map_data.currentlyHoveredTile.x != undefined) {
                console.warn("no longer hovering last hovered tile!");
                store.dispatch("unhoverTile", state.map_data.currentlyHoveredTile);
                //store.dispatch("saveLastHoveredTile", state.map_data.currentlyHoveredTile);
                store.dispatch("updateCanvas");
                execFlag = true;
            }
            /*
            if (store.state.map_data.currentlyHoveredTile.x != undefined) {
                //store.dispatch("saveCurrentlyHoveredTile", { x: undefined, y: undefined });
            }*/
        }
    }
    return state;
};
