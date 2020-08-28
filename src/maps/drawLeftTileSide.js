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
      
      let zMultiplier = z === 0 ? 0 : z-1;
      let topHalf = tile.c + tile.tileWidth * y - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.d;
      let bottomHalf = tile.c + tile.tileWidth * y - y * tile.tileWidth * 0.5 - tile.tileYoffset + tile.tileWidth * 1.75 + zMultiplier * (tile.tileWidth / 4);
      

      // upper left corner of tile
      ctx.moveTo(tile.tileWidth * y + mapX + tile.tileWidth * x, topHalf);
      // lower left corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x, bottomHalf);
      // lower right corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, bottomHalf + tile.tileWidth * 0.5);
      // upper right corner of tile
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, topHalf);
      
      ctx.closePath();
      ctx.fillStyle = tile.fillColor;
      ctx.fill();
      
    }
  }