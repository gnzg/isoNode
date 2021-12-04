import Tile from "../classes/tile";
import state from "../store/state";

export default (tile: Tile) => {
  const x: number = tile.x;
  const y: number = tile.y;
  const z: number = tile.z;

  let ctx = state.ctx;

  let map_tiles = state.env.map_tiles;
  let map_tiles_height = state.env.map_tiles_height;
  let map_offset_x = state.env.map_offset_x;

  const debug = state.debug_mode;

  // left tile side
  if (
    // draw if first tile in row
    x === 0 ||
    // or, if preceeded by an empty tile on the x axis,
    map_tiles[y][x - 1] === 0 ||
    // or if not exceeding row length
    x > map_tiles[y].length - 1 ||
    // if current tile's height is greater than its predecessor's
    map_tiles_height[y][x] > map_tiles_height[y][x - 1]
  ) {
    // if current tile has a higher height, draw under drawn elements
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();

    let zMultiplier = z === 0 ? 0 : z - 1;
    let topHalf =
      tile.c +
      tile.tileWidth * y -
      y * tile.tileWidth * 0.5 -
      tile.tileYoffset +
      tile.d;
    let bottomHalf =
      tile.c +
      tile.tileWidth * y -
      y * tile.tileWidth * 0.5 -
      tile.tileYoffset +
      tile.tileWidth * 1.75 +
      zMultiplier * (tile.tileWidth / 4);

    // establish left tile side height based on previous tile's height, if it exists
    let prevTileZ = map_tiles_height[y][x - 1] ? map_tiles_height[y][x - 1] : 0;
    let prevTileZOffset = prevTileZ * (tile.tileWidth / 4);

    // upper left corner of tile
    ctx.moveTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x, topHalf);
    // bottom left corner of tile
    ctx.lineTo(
      tile.tileWidth * y + map_offset_x + tile.tileWidth * x,
      bottomHalf - prevTileZOffset
    );
    // bottom right corner of tile
    ctx.lineTo(
      tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth,
      bottomHalf + tile.tileWidth * 0.5 - prevTileZOffset
    );
    // upper right corner of tile
    ctx.lineTo(
      tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth,
      topHalf
    );

    ctx.closePath();
    ctx.fillStyle = tile.fillColor;
    ctx.fill();

    // for debugging purposes, draw point at position 0
    if (x === 0 && y === 0 && debug) {
      ctx.beginPath();
      ctx.globalCompositeOperation = "source-over";
      let dummyX = tile.tileWidth * y + map_offset_x + tile.tileWidth * x;
      let dummyY = topHalf;
      ctx.arc(dummyX, dummyY, 3, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }
};
