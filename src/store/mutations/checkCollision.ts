import StateInterface from "../../interfaces/StateInterface";
import pointInRhombus from "../../math/PointInRhombus";
import store from "../index";

// checks whether the current mouse coordinates fall within saved hitboxes of non-zero tiles
// by comparing the position of the cursor with each tile hitbox saved in the global state

export default (state: StateInterface, payload : MouseEvent) => {

  type MapEntry = {
    x: number;
    y: number;
  }

  // initial check if required hitboxes exist
  if (state.map_data.tileHitBoxes.length <= 0) {
    store.dispatch("error", "tileHitBoxes length is zero! Recreating...");
    store.dispatch("createTileHitBoxes");
  }

  let cursor_pos_x = payload.clientX;
  let cursor_pos_y = payload.clientY;
  let tileCoordinates = state.map_data.tileHitBoxes;
  let lastHoveredTile : MapEntry = {x: undefined, y: undefined};

  // TODO: re-write; current approach is expensive
  for (let i = 0; i < tileCoordinates.length; i++) {

    // if cursor is within a given tile's space
    if (pointInRhombus(tileCoordinates[i], { x: cursor_pos_x, y: cursor_pos_y })) {
      
      // on initial run, save first hovered tile as lastHoveredTile
      lastHoveredTile = {
        x: tileCoordinates[i].x,
        y: tileCoordinates[i].y,
      };
      //console.log(lastHoveredTile.x, lastHoveredTile.y);

      if (state.map_data.lastHoveredTile.x === undefined ) {
        store.dispatch("saveLastHoveredTile", lastHoveredTile);
      }
      // only unhover lastHoveredTile if it was already set
      else if (state.map_data.lastHoveredTile.x !== undefined) {
        store.dispatch("unhoverTile", state.map_data.lastHoveredTile);
      }

      store.dispatch("hoverTile", lastHoveredTile);
      store.dispatch("updateCanvas");

      // if hovering a new tile
      if (
        lastHoveredTile.x !== state.map_data.lastHoveredTile.x ||
        lastHoveredTile.y !== state.map_data.lastHoveredTile.y) {
        store.dispatch("unhoverTile", state.map_data.lastHoveredTile);

        store.dispatch("hoverTile", lastHoveredTile);
        store.dispatch("saveLastHoveredTile", lastHoveredTile);
        store.dispatch("updateCanvas");
      }
      // if hovering same tile
      else if (lastHoveredTile.x === state.map_data.lastHoveredTile.x &&
        lastHoveredTile.y === state.map_data.lastHoveredTile.y) {
      }
    }
    // if mouse is outside of map -> calculate map size based on location and tile max length in both x,z axes
    /*else if (!pointInRhombus(tileCoordinates[i], { x: cursor_pos_x, y: cursor_pos_y })) {
      store.dispatch('error', 'cursor is outside of map!');
    }*/
  }
  payload.stopImmediatePropagation();
  return state;
};
