import tileHeightMap from '../maps/tileHeightMap';
import state from '../store/state';

export default ({tile, x, y}) => {
  
  let ctx = state.ctx;
  let map = state.env.map;
  let mapX = state.env.mapX;
  
  // right
  if (
    // draw if not last row and the next row's tiles are zero
    (map[y + 1] !== undefined
    && map[y + 1][x] === 0) 
    ||
    // if not last row and next row's tiles' heightmap is not undefined and greater than current tile's height map
    (map[y + 1] !== undefined 
    && tileHeightMap[y + 1][x] !== undefined
    && tileHeightMap[y + 1][x] < tileHeightMap[y][x])
    ||
    // if last row
    y === map.length-1
    ) {
      ctx.globalCompositeOperation = 'source-over';
      
      ctx.beginPath();
      
      // upper left corner of tile
      ctx.moveTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, tile.c + tile.tileWidth * y - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.d);
      // lower left corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, tile.c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 - y * tile.tileWidth * 0.5 - tile.tileYoffset /* WIP */ - tile.tileWidth);
      // lower right corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.c /* WIP */ - tile.tileWidth);
      // upper right corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, tile.tileWidth * y + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.c + tile.d);
      
      ctx.closePath();
      ctx.fillStyle = tile.fillColor;
      ctx.fill();
    }
  }