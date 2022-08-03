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
            console.warn("hovering a tile!");

            let hoveredTile = {
                x: tileHitBoxes[i].x,
                y: tileHitBoxes[i].y,
            };

            // console.log("hoveredTile", hoveredTile);
            store.dispatch("saveCurrentlyHoveredTile", hoveredTile);
            store.dispatch("saveLastHoveredTile", hoveredTile);

            /*
            if (
                store.state.map_data.currentlyHoveredTile.x != store.state.map_data.lastHoveredTile.x ||
                store.state.map_data.currentlyHoveredTile.y != store.state.map_data.lastHoveredTile.y
            ) { */
            store.dispatch("onTileUnhover", state.map_data.lastHoveredTile);
            store.dispatch("onTileHover", state.map_data.currentlyHoveredTile);
            store.dispatch("saveLastHoveredTile", state.map_data.currentlyHoveredTile);
            //}

            store.dispatch("updateCanvas");
        }
        // if not hovering any tile
        else {
            console.warn("not hovering any tile!");
        }
    }
    return state;
};
