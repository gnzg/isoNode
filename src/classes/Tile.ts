import state from "../store/state";
import store from "../store/index";
import colors from "../utilities/colors";

/**
 *  Tile object
 *  stores all info related to the tile object
 */
export default class Tile {
  x: number;
  y: number;
  z: number;
  c: number;
  d: number;
  tileType: number;
  tileHeight: number;
  tileWidth: number;
  tileYoffset: number;
  topYfactor: number;
  topYsegment: number;
  fillColor: string;
  rectColor: string;

  constructor({ x, y, z = 0 }) {
    // TODO: z parameter
    if (this.areParamsInvalid(x, y)) {
      store.dispatch(
        "error",
        "The tile object incorrect number of parameters!"
      );
    } else {
      this.tileWidth = state.map_data.tileWidth;
      this.x = x;
      this.y = y;
      this.z = z;
      // TODO: find better naming convention
      this.c = state.map_data.map_offset_y - this.tileWidth * x * 0.5;
      this.d = this.tileWidth * 1.5;

      // check if tile map and tile height map lengths are the same
      if (
        state.map_data.map_tiles_height.length !==
        state.map_data.map_tiles.length
      ) {
        store.dispatch(
          "error",
          "map_tiles_height length is different than map_tiles height!"
        );
      } else {
        this.tileHeight = state.map_data.map_tiles_height[y][x];
        this.tileType = state.map_data.map_tiles[y][x];

        // every height degree is one quarter of the tile's own height
        // fixed values
        this.tileYoffset =
          this.tileWidth + (this.tileHeight * this.tileWidth) / 4;
        this.topYfactor = this.tileWidth * y * 0.5;
        this.topYsegment = this.c + this.topYfactor - this.tileYoffset;

        // refers to the tile's sides
        this.fillColor = Object.values(colors.rectShadowColors)[this.tileType];

        // refers to the tile's top rectangle
        this.rectColor = Object.values(colors.rectColors)[this.tileType];
      }
    }
  }
  areParamsInvalid(x: number, y: number) {
    return x == undefined || y == undefined;
  }
}
