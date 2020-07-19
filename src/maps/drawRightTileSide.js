
export default ({ctx, tempMap, mapHeight, tile, mapX, y, x, d, c, fillColor}) => {

    // right
    // draw only if suceeded by a tile on the y axis, or if iterating over the last y element
    if ((tempMap[y  + 1] !== undefined && tempMap[y+1][x] === 0) || y === tempMap.length-1) {
      
      if (tempMap[y  + 1] !== undefined && tempMap[y  + 1][x] !== 1 
        || y=== tempMap.length - 1) {
          ctx.globalCompositeOperation = 'source-over';
      }
      else {
          ctx.globalCompositeOperation = 'destination-over';
      }
      ctx.beginPath();
      ctx.moveTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * y + d - y * tile.tileWidth * 0.5 - tile.tileYoffset);
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
      ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + d + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
}