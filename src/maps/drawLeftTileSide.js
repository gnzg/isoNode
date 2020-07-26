import heightMap from '../maps/tileHeightMap';
import state from '../store/state';

export default ({mapX, tile, y, x, d, c}) => {

  let ctx = state.ctx;
  let map = state.env.map;

  // left
  // draw only if preceeded by an empty tile on the x axis,
  // or if first tile on x axis
  if (map[y][x - 1] === 0
    || x === 0
    || heightMap[y][x] > heightMap[y][x-1]
    ) {
      
      // if current tile has a higher height,
      // then draw under drawn elements
      if (heightMap[y][x] <= heightMap[y][x-1]) { 
        ctx.globalCompositeOperation = 'destination-over';
      } 
      // if tile iterator is at position 0 or if on the same map, the previous tile was zero
      else {
        ctx.globalCompositeOperation = 'source-over';
      }
      
      ctx.beginPath();
      
      let sideHeight = heightMap[y][x] !== 0 ? (20 / heightMap[y][x]) : 0;
      // upper left corner of tile
      ctx.moveTo(tile.tileWidth * y  + mapX + tile.tileWidth * x, c + tile.tileWidth * y + d - y* tile.tileWidth * 0.5 - tile.tileYoffset );
      // lower left corner of tile
      ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x, c + tile.tileWidth * y  + tile.tileWidth + tile.tileWidth * 1.75 - y * tile.tileWidth * 0.5 - tile.tileYoffset - sideHeight);
      // lower right corner of tile
      ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y* tile.tileWidth * 0.5 - tile.tileYoffset - sideHeight);
      // upper right corner of tile
      ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + d + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
      
      ctx.closePath();
      ctx.fillStyle = tile.fillColor;
      ctx.fill();

    }
  }