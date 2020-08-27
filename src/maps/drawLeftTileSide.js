import tileHeightMap from '../maps/tileHeightMap';
import state from '../store/state';

export default ({tile, x, y, z}) => {
  let ctx = state.ctx;
  let map = state.env.map;
  let mapX = state.env.mapX;
  
  // left
  if (
    // draw only if preceeded by an empty tile on the x axis,
    map[y][x - 1] === 0
    // if first tile in row
    || x === 0
    // if not exceeding row length
    || x > map[y].length -1
    // if current tile's height is greater than its predecessor's
    || tileHeightMap[y][x] > tileHeightMap[y][x-1]
    ) {
      
      // if current tile has a higher height
      // draw under drawn elements
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      
      // upper left corner of tile
      ctx.moveTo(tile.tileWidth * y + mapX + tile.tileWidth * x, tile.c + tile.tileWidth * y - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.d);
      // lower left corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x, tile.c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 - y * tile.tileWidth * 0.5 - tile.tileYoffset - /* WIP */ tile.tileWidth);
      // lower right corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, tile.c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y* tile.tileWidth * 0.5 - tile.tileYoffset - /* WIP */ tile.tileWidth);
      // upper right corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, tile.c + tile.tileWidth * y + tile.d + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
      
      ctx.closePath();
      ctx.fillStyle = tile.fillColor;
      ctx.fill();
      
    }
  }