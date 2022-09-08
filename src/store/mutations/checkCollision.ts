import StateInterface from "../../interfaces/StateInterface";
import pointInRhombus from "../../math/PointInRhombus";
import store from "../index";

// checks whether cursor coordinates fall within a tile hitbox
export default (state: StateInterface, payload: MouseEvent) => {
  let cursor = { x: payload.clientX, y: payload.clientY };
  let tileHitBoxes = state.map_data.tileHitBoxes;
  let tileWidth = state.map_data.tileWidth;
  let map_offset_x = state.map_data.map_offset_x;

  // Check if hitboxes already exist
  if (tileHitBoxes.length === 0) {
    console.warn("tileHitBoxes do not exist yet. Creating 'em...");

    store.dispatch("createTileHitBoxes");
    //store.dispatch("createMapHitBox");
    return state;
  } else {
    console.log("tileHitBoxes already exist.");
    // TODO: current approach is expensive

    // checks whether a tile hitbox has been entered by the cursor
    for (let i = 0; i < tileHitBoxes.length; i++) {
      if (pointInRhombus(tileHitBoxes[i], { x: cursor.x, y: cursor.y })) {
        console.warn("hovering a tile!");

        let hoveredTile = tileHitBoxes[i];

        store.dispatch("saveCurrentlyHoveredTile", hoveredTile);
        //store.dispatch("saveLastHoveredTile", hoveredTile);

        store.dispatch("onTileHover", state.map_data.currentlyHoveredTile);
        store.dispatch("updateCanvas");
        //store.dispatch("saveLastHoveredTile", state.map_data.currentlyHoveredTile);
      }
      // if leaving hovered tile
      else if (!pointInRhombus(tileHitBoxes[i], { x: cursor.x, y: cursor.y })) {
        console.log("not in hitbox");
        store.dispatch("updateCanvas");
      }
    }
  }
};
