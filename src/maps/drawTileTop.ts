import Tile from "../objects/tile";
import state from "../store/state";
import drawAdditionalDetails from "./drawOutlines";
import RhombusVertices from "../math/RhombusVertices";

/**
 * @param Integer x    iterates across a map array
 * @param Integer y    iterates across a map array child's elements
 * @returns Object canvas
 */

export default (tile: Tile) => {
  const x = tile.x;
  const y = tile.y;
  const z = tile.z;

  let map_tiles = state.env.map_tiles;
  let map_tiles_height = state.env.map_tiles_height;
  let map_offset_x = state.env.map_offset_x;

  let topYfactor = tile.tileWidth * y * 0.5;
  let topYsegment = tile.c + topYfactor - tile.tileYoffset;

  let ctx = state.ctx;

  // tile top
  // draw only if current tile is non-zero
  // and if the tile height level corresponds to z
  if (map_tiles[y][x] !== 0 && map_tiles_height[y][x] === z) {
    // determine whether the surface will be drawn above or below
    // the present data on thecanvas
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = tile.rectColor;
    ctx.beginPath();

    // upper left corner of tile
    ctx.moveTo(
      tile.tileWidth * y + tile.tileWidth + map_offset_x + tile.tileWidth * x,
      tile.tileWidth + topYsegment
    );
    ctx.lineTo(
      tile.tileWidth * y +
        tile.tileWidth * 2 +
        map_offset_x +
        tile.tileWidth * x,
      tile.d + topYsegment
    );
    ctx.lineTo(
      tile.tileWidth * y + tile.tileWidth + map_offset_x + tile.tileWidth * x,
      tile.tileWidth * 2 + topYsegment
    );
    ctx.lineTo(
      tile.tileWidth * y +
        tile.tileWidth -
        tile.tileWidth +
        map_offset_x +
        tile.tileWidth * x,
      tile.d + topYsegment
    );
    ctx.closePath();
    ctx.fill();

    // debug mode
    if (state.debug_mode === true) {
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices({ tile, x, y });
      drawAdditionalDetails({ ctx, rhombusVertices, x, y });
    }
  }
};
