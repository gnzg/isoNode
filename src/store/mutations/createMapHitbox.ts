import StateInterface from "../../interfaces/StateInterface";
import store from "../index";

export default (state: StateInterface) => {
  let mapHitBox = state.map_data.mapHitBox;
  let tileHitBoxes = state.map_data.tileHitBoxes;
  let tileWidth = state.map_data.tileWidth;

  if (mapHitBox == undefined) {
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
  } else {
    return false;
  }
};
