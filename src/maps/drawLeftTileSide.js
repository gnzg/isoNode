export default ({ctx, tempMap, mapHeight, tile, mapX, y, x, d, c, fillColor}) => {
  // left
  // draw only if preceeded by an empty tile on the x axis,
  // or if first tile on x axis
  if (tempMap[y][x - 1] === 0
    || x === 0
    || mapHeight[y][x] > mapHeight[y][x-1]
    ) {
      
      // if current tile has a higher height,
      // then draw under drawn elements
      if (mapHeight[y][x] <= mapHeight[y][x-1]) { 
        ctx.globalCompositeOperation = 'destination-over';
      } 
      // if tile iterator is at position 0 or if on the same map, the previous tile was zero
      else {
        ctx.globalCompositeOperation = 'source-over';
      }
      
      ctx.beginPath();
      
      // upper left corner of tile
      ctx.moveTo(tile.tileWidth * y  + mapX + tile.tileWidth * x, c + tile.tileWidth * y  + d - y* tile.tileWidth * 0.5 - tile.tileYoffset);
      
      // lower left corner of tile
      ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x, c + tile.tileWidth * y  + tile.tileWidth + tile.tileWidth * 1.75 - y* tile.tileWidth * 0.5 - tile.tileYoffset -20 * mapHeight[y][x]);
      
      // lower right corner of tile
      ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y  + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y* tile.tileWidth * 0.5 - tile.tileYoffset - 20 * mapHeight[y][x]);
      
      // upper right corner of tile
      ctx.lineTo(tile.tileWidth * y  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y  + d + tile.tileWidth * 0.5 - y* tile.tileWidth * 0.5 - tile.tileYoffset);
      
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
  }