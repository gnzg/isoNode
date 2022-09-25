import state from "../store/state";
import store from "../store/index";
import { TileType } from "../interfaces/tileType";
import { Point } from "../interfaces/pointType";

export default class RhombusVertices {
  tile: TileType; // the tile in question
  x: number; // x value relative to canvas
  y: number; // y value relativ to canvas
  d: number; // fixed integer value, currently at tileWidth * 1.5, see Tile class
  pointA: Point;
  pointB: Point;
  pointC: Point;
  pointD: Point;

  constructor(x: number, y: number) {
    if (this !== undefined && y !== undefined && x !== undefined) {
      const map_offset_x = state.map_data.map_offset_x;
      const tileWidth = state.map_data.tileWidth;
      const c = state.map_data.map_offset_y - tileWidth * x * 0.5;
      const d = tileWidth * 1.5;
      const tileHeight = state.map_data.map_tiles_height[y][x];
      const topYfactor = tileWidth * y * 0.5;
      const tileYoffset = tileWidth + (tileHeight * tileWidth) / 4;
      const topYsegment = c + topYfactor - tileYoffset;

      // leftmost point
      this.pointA = {
        x: tileWidth * y + map_offset_x + tileWidth * x,
        y: d + topYsegment,
      };
      // central bottom point
      this.pointB = {
        x: tileWidth * y + map_offset_x + tileWidth * x + tileWidth,
        y: topYsegment + tileWidth * 2,
      };
      // rightmost point
      this.pointC = {
        x: tileWidth * y + map_offset_x + tileWidth * x + tileWidth * 2,
        y: d + topYsegment,
      };
      // central top point
      this.pointD = {
        x: tileWidth * y + map_offset_x + tileWidth * x + tileWidth,
        y: topYsegment + tileWidth,
      };
    } else {
      store.dispatch(
        "error",
        "RhombusVertrices received too many/few arguments!"
      );
    }
  }
}
