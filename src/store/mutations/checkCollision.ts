import StateInterface from "../../interfaces/StateInterface";
import { Point } from "../../interfaces/Point";
import pointInRhombus from "../../math/PointInRhombus";
import store from "../index";

// check whether cursor coordinates fall within saved hitboxes of non-empty tiles
export default (state: StateInterface, payload: MouseEvent) => {
  let cursor_pos_x = payload.clientX;
  let cursor_pos_y = payload.clientY;
  let tileHitBoxes: Point[] = state.map_data.tileHitBoxes;
  let tileWidth = store.state.map_data.tileWidth;

  // Mandatory: check if hitboxes exist
  if (state.map_data.tileHitBoxes.length <= 0) {
    console.warn("tileHitBoxes do not exist yet. Creating 'em...");
    store.dispatch("createTileHitBoxes");
    state.map_data.mapHitBox =
      // TODO: verify if calculated area is correct
      {
        pointA: {
          x: tileHitBoxes[0].x + tileWidth / 2,
          y: tileHitBoxes[0].y - tileWidth / 2,
        },
        pointB: { x: tileHitBoxes[0].x + tileWidth, y: tileHitBoxes[0].y },
        pointC: {
          x: tileHitBoxes[0].x + tileWidth / 2,
          y: tileHitBoxes[0].y + tileWidth / 2,
        },
        pointD: { x: tileHitBoxes[0].x, y: tileHitBoxes[0].y },
      };
  } else if (
    state.map_data.tileHitBoxes.length >= 0 &&
    !pointInRhombus(state.map_data.mapHitBox, {
      x: cursor_pos_x,
      y: cursor_pos_y,
    })
  ) {
    console.log("tileHitBoxes already eixst.");
    //return false;

    // TODO: current approach is expensive
    for (let i = 0; i < tileHitBoxes.length; i++) {
      // console.log("in for block");
      let rhombusToCheck =
        // TODO: verify if calculated area is correct
        // TODO: missing canvas-specific offset
        {
          pointA: {
            x: tileHitBoxes[i].x + tileWidth / 2,
            y: tileHitBoxes[i].y - tileWidth / 2,
          },
          pointB: { x: tileHitBoxes[i].x + tileWidth, y: tileHitBoxes[i].y },
          pointC: {
            x: tileHitBoxes[i].x + tileWidth / 2,
            y: tileHitBoxes[i].y + tileWidth / 2,
          },
          pointD: { x: tileHitBoxes[i].x, y: tileHitBoxes[i].y },
        };

      //alert(rhombusToCheck.pointA.x + " " + rhombusToCheck.pointA.y);

      // if cursor is within a given tile's space
      if (
        pointInRhombus(rhombusToCheck, { x: cursor_pos_x, y: cursor_pos_y })
      ) {
        // alert("IN HITOBX");

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
        store.dispatch(
          "saveLastHoveredTile",
          state.map_data.currentlyHoveredTile
        );
      }
      // if leaving hovered tile
      else if (
        !pointInRhombus(rhombusToCheck, { x: cursor_pos_x, y: cursor_pos_y })
      ) {
        console.log("not in hitbox");

        let execFlag = false;
        if (
          execFlag == false &&
          state.map_data.currentlyHoveredTile.x != undefined
        ) {
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
  }
  return state;
};
