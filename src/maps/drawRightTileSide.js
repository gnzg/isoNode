import tileHeightMap from '../maps/tileHeightMap';
import state from '../store/state';

export default ({tile, x, y, z}) => {
  let ctx = state.ctx;
  let map = state.env.map;
  let map_offset_x = state.env.map_offset_x;
  const debug = false;

  // right tile side
  if ((
    // draw if not last row and the next row's tiles are zero
    (map[y + 1] !== undefined && map[y + 1][x] === 0) ||
    // if not last row and next row's tiles' heightmap is not undefined and greater than current tile's height map
    (map[y + 1] !== undefined && tileHeightMap[y + 1][x] !== undefined && tileHeightMap[y + 1][x] < tileHeightMap[y][x]) ||
    // or, if last row
    // and not in debug mode
    y === map.length-1) && !debug 
    ) {
      ctx.globalCompositeOperation = 'source-over';
      
      ctx.beginPath();

      let zMultiplier = z === 0 ? 0 : z - 1;
      let topHalf = tile.c + tile.tileWidth * y - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.d;
      let bottomHalf = tile.c + tile.tileWidth * y - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.tileWidth * 1.75 + zMultiplier * (tile.tileWidth / 4);
      
      // upper left corner of tile
      ctx.moveTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth * 2, topHalf);
      // bottom left corner of tile
      ctx.lineTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth * 2, bottomHalf);
      // bottom right corner of tile
      ctx.lineTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth, bottomHalf + tile.tileWidth * 0.5);
      // upper right corner of tile
      ctx.lineTo(tile.tileWidth * y + map_offset_x + tile.tileWidth * x + tile.tileWidth, topHalf + tile.tileWidth * 0.5);
      
      ctx.closePath();
      ctx.fillStyle = tile.fillColor;
      ctx.fill();
    }
  }