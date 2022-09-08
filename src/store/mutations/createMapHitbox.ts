import Store from "../index";
import { Rhombus } from "../../interfaces/Rhombus";
import StateInterface from "../../interfaces/StateInterface";
import RhombusVertices from "../../classes/RhombusVertices";

export default (state: StateInterface) => {
  let mapHitBox = state.map_data.mapHitBox;
  let firstTileHitBox = state.map_data.tileHitBoxes[0];
  let tileWidth = state.map_data.tileWidth;

  if (mapHitBox == undefined) {
    // TODO: correct calculation of hitbox area
    state.map_data.mapHitBox = firstTileHitBox;
  } else {
    return false;
  }
};
