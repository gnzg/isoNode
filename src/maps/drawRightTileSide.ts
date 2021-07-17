import Tile from "../objects/tile";
import state from "../store/state";

export default (tile: Tile) => {
  const x = tile.x;
  const y = tile.y;
  const z = tile.z;

  let ctx = state.ctx;

  let map_tiles = state.env.map_tiles;
  let map_tiles_height = state.env.map_tiles_height;
  let map_offset_x = state.env.map_offset_x;

  const debug = false;

  // right tile side
  if (
    // draw if not last row and the next row's tiles are zero
    ((map_tiles[y + 1] !== undefined && map_tiles[y + 1][x] === 0) ||
      // or, if not last row and next row's tiles' heightmap is not undefined and greater than current tile's height map
      (map_tiles[y + 1] !== undefined &&
        map_tiles_height[y + 1][x] !== undefined &&
        map_tiles_height[y + 1][x] < map_tiles_height[y][x]) ||
      // or, if last row and not in debug mode
      y === map_tiles.length - 1) &&
    !debug
  ) {
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

    // upper left corner of tile
    ctx.moveTo(
      tile.tileWidth * y +
        map_offset_x +
        tile.tileWidth * x +
        tile.tileWidth * 2,
      topHalf
    );
    // bottom left corner of tile
    ctx.lineTo(
      tile.tileWidth * y +
        map_offset_x +
        tile.tileWidth * x +
        tile.tileWidth * 2,
      bottomHalf
    );
    // bottom right corner of tile
    ctx.lineTo(
      tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth,
      bottomHalf + tile.tileWidth * 0.5
    );
    // upper right corner of tile
    ctx.lineTo(
      tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth,
      topHalf + tile.tileWidth * 0.5
    );

    ctx.closePath();
    ctx.fillStyle = tile.fillColor;
    ctx.fill();
  }
};
