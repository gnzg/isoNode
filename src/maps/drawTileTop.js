import state from '../store/state'
import tileHeightMap from './tileHeightMap';

/**
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @returns Object canvas
*/

export default ( {tile, x, y }) => {
  
  let mapX = state.env.mapX;
  let mapY = state.env.mapY;
  let map = state.env.map;
  let ctx = state.ctx;
  let c = mapY - tile.tileWidth * x * 0.5;
  let d = tile.tileWidth * 1.5;
  let topYfactor = tile.tileWidth * y * 0.5;
  let topYsegment = c + topYfactor - tile.tileYoffset;
  
  // top
  // draw only if current tile is non-zero
  if (map[y][x] !== 0 ) {
    
    // determine whether the surface will be drawn above or below 
    // the present data on thecanvas
      ctx.globalCompositeOperation = 'source-over';

    // IDEA: draw each level separately

    ctx.fillStyle = tile.rectColor;
    ctx.beginPath();
    ctx.moveTo(tile.tileWidth * y + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth * 2 + mapX + tile.tileWidth * x, d + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth - tile.tileWidth + mapX + tile.tileWidth * x, d + topYsegment);
    ctx.closePath();
    ctx.fill();
    
  }
}