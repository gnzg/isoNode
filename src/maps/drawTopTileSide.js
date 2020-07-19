import drawAdditionalDetails from './drawAdditionalDetails';

export default ({ctx, tempMap, mapHeight, tile, mapX, y, x, d, c, state, topYsegment, rhombusVertices}) => {
    // top
        // draw only if current tile is non-zero
        if (tempMap[y][x] !== 0) {
          ctx.fillStyle = tile.rectColor;
          
          // check placement based on tile offset 
          // if current offset is larger than the offset of the next tile, 
          // then current tile visibility dominates
          if (
            // should be 4 cases
    
            // if next tile on y axis has a higher mapHeight
              (mapHeight[y][x - 1] !== undefined &&
              mapHeight[y][x] >= mapHeight[y][x-1])
              || x === 0
          ) { 
              ctx.globalCompositeOperation = 'source-over';
            } else {
                ctx.globalCompositeOperation = 'destination-over';
            }
            
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