import drawAdditionalDetails from './drawOutlines';
import heightMap from '../maps/tileHeightMap';
import map from '../maps/map0';
import state from '../store/state'

export default ({tile, mapX, y, x, c, rhombusVertices}) => {

  let ctx = state.ctx;

  // top
  // draw only if current tile is non-zero
  if (map[y][x] !== 0) {
    ctx.fillStyle = tile.rectColor;
    
    let d = tile.tileWidth * 1.5;
    let topYfactor = tile.tileWidth * y * 0.5;
    let topYsegment = c + topYfactor - tile.tileYoffset;
    
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