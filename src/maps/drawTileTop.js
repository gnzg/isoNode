import drawAdditionalDetails from './drawOutlines';

export default ({ctx, map, heightMap, tile, mapX, y, x, d, i, state, topYsegment, rhombusVertices}) => {
  // top
  // draw only if current tile is non-zero
  if (map[y][x] !== 0 && heightMap[y][x] === i) {
    ctx.fillStyle = tile.rectColor;
    
    ctx.globalCompositeOperation = 'source-over';
    
    ctx.beginPath();
    ctx.moveTo(tile.tileWidth * y + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth * 2 + mapX + tile.tileWidth * x, d + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth - tile.tileWidth + mapX + tile.tileWidth * x, d + topYsegment);
    ctx.closePath();
    ctx.fill();
    
    // draw vertices; only available in debug mode
    if (state.debug_mode === true) {
      drawAdditionalDetails(ctx, rhombusVertices);
    }
  }
}