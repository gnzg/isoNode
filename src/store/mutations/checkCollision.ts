import StateInterface from "../../interfaces/StateInterface";
import { pointInRhombus } from "../../math/math";
import store from "../index";

// checks whether the current mouse coordinates fall within saved hitboxes of non-zero tiles
// by comparing the position of the cursor with each tile hitbox saved in the global state

export default (state: StateInterface, payload : MouseEvent) => {

  // initial check if required hitboxes exist
  if (state.env.tileHitBoxes.length <= 0) {
    store.dispatch("error", "tileHitBoxes length is zero! Recreating...");
    store.dispatch("createTileHitBoxes");
  }

  let cursor_pos_x = payload.clientX;
  let cursor_pos_y = payload.clientY;
  let tileCoordinates: Array<{ x: number; y: number }> | any = state.env.tileHitBoxes;

  for (let i = 0; i < tileCoordinates.length; i++) {
    let tile_position;

    // if cursor is within a given tile's space
    if (pointInRhombus(tileCoordinates[i], { x: cursor_pos_x, y: cursor_pos_y })) {
      tile_position = {
        x: tileCoordinates[i].x,
        y: tileCoordinates[i].y,
      };

      //console.log("currently hovering tile", tile_position.x, tile_position.y);

      store.dispatch("tileHovered", tile_position);
      // on initial run, save first hovered tile as lastHoveredTile
      if (state.env.lastHoveredTile === undefined ) store.dispatch("saveLastHoveredTile", tile_position);
      store.dispatch("updateCanvas");

      // if hovering a new tile
      if (
          tile_position.x !== state.env.lastHoveredTile.x ||
          tile_position.y !== state.env.lastHoveredTile.y) {

        //console.log("UNhovering tile:", state.env.lastHoveredTile.x, state.env.lastHoveredTile.y);
        store.dispatch("tileNotHovered", state.env.lastHoveredTile);

        store.dispatch("tileHovered", tile_position);
        store.dispatch("saveLastHoveredTile", tile_position);
        store.dispatch("updateCanvas");
      }
      // if hovering same tile
      else if (tile_position.x === state.env.lastHoveredTile.x &&
               tile_position.y === state.env.lastHoveredTile.y) {
        //console.log("Hovering same tile");
      }
      // exit for loop
      return true;
    }
  }
};
