import Tile from "../classes/Tile";
import state from "../store/state";
import drawLeftTileSide from "./drawLeftTileSide";
import drawRightTileSide from "./drawRightTileSide";

export default (tile: Tile) => {
  const x: number = tile.x;
  const y: number = tile.y;
  const z: number = tile.z;

  let map_tiles = state.map_data.map_tiles;
  let map_tiles_height = state.map_data.map_tiles_height;

  // if the map is defined and the tile is non-zero, draw it
  if (
    map_tiles !== undefined &&
    map_tiles[y] !== undefined &&
    map_tiles[y][x] !== 0 &&
    // draw only the tiles correspond to the current height value i
    map_tiles_height[y][x] === z
  ) {
    drawLeftTileSide(tile);
    drawRightTileSide(tile);
  } else if (map_tiles.length == 0) {
    console.error("Length of main map is zero!");
  }
};
