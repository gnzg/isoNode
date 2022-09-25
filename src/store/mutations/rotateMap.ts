import { tileMapType } from "../../interfaces/tileMapType";
import store from "../index";

export default (state) => {
  let currentMap: tileMapType = state.map;
  let rotatedMap: tileMapType = { tiles: [], tile_height: [] };

  // reset rotated map's tiles
  rotatedMap.tiles = [];

  rotatedMap.tiles = currentMap.tiles.reverse(); // TODO: rewrite without an undesirable array mutation

  for (let i = 0; i < rotatedMap.tiles.length; i++) {
    rotatedMap.tiles[i].reverse(); // TODO: rewrite without an undesirable array mutation
  }
  state.map.tiles = rotatedMap.tiles;

  if (state.map_data.rotationDegree < 270) state.map_data.rotationDegree += 90;
  else state.map_data.rotationDegree = 0;

  store.dispatch("updateCanvas");
  return state;
};
