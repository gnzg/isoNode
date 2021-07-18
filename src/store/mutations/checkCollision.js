import State from "../../interfaces/StateInterface";
import { pointInRhombus } from "../../math/math";
import store from "../index";

// checks whether the current mouse coordinates fall within saved hitboxes of non-zero tiles
// by comparing the position of the cursor with each tile hitbox saved in the global state

export default (state, payload) => {
  let cursor_pos_x = payload.clientX;
  let cursor_pos_y = payload.clientY;

  let tileCoordinates = state.env.tileHitBoxes;

  for (let i = 0; i < tileCoordinates.length; i++) {
    // tileCoordinates[tileN]{x,y}
    let tilePos;

    // if mouse within constraints of tile
    if (
      pointInRhombus(tileCoordinates[i], { x: cursor_pos_x, y: cursor_pos_y })
    ) {
      tilePos = {
        x: tileCoordinates[i].x,
        y: tileCoordinates[i].y,
      };
      // console.log('tilePos.x', tilePos.x);
      //console.log('currently hovering tile', tilePos.x, tilePos.y);

      // if no tile was previously hovered
      if (state.env.lastHoveredTile.x === undefined) {
        //write currently hovered tile to global state
        store.dispatch("tileHovered", tilePos);
        store.dispatch("saveLastHoveredTile", tilePos);
        store.dispatch("updateCanvas");
      }
      // if hovering same tile, do nothing
      else if (
        tilePos.x === state.env.lastHoveredTile.x &&
        tilePos.y === state.env.lastHoveredTile.y
      ) {
        //store.dispatch("tileHovered", tilePos);
      }
      // if hovering a new tile
      else if (
        tilePos.x !== state.env.lastHoveredTile.x ||
        tilePos.y !== state.env.lastHoveredTile.y
      ) {
        console.log(
          "UNhovering tile:",
          state.env.lastHoveredTile.x,
          state.env.lastHoveredTile.y
        );
        store.dispatch("tileHovered", tilePos);
        store.dispatch("tileNotHovered", state.env.lastHoveredTile);
        store.dispatch("updateCanvas");
      }
      // exit for loop
      return true;
    }
    /*
    else if (
        // TODO calculate total shape surface to determine if cursor left it
        
        pointInRhombus(rhombus, { x: event.clientX, y: event.clientY }) == false
    ) {
      console.log("outside of map!");
    }
    */
  }
};
