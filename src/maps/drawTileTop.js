import state from '../store/state'
import tileHeightMap from './tileHeightMap';
import drawAdditionalDetails from '../maps/drawOutlines';
import RhombusVertices from '../math/RhombusVertices';

/**
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @returns Object canvas
*/

export default ({ tile, x, y, z }) => {
  
  let mapX = state.env.mapX;
  let map = state.env.map;
  let ctx = state.ctx;
  let topYfactor = tile.tileWidth * y * 0.5;
  let topYsegment = tile.c + topYfactor - tile.tileYoffset;
  
  // tile top
  // draw only if current tile is non-zero
  // and if the tile height level corresponds to z
  if (map[y][x] !== 0 && tileHeightMap[y][x] === z) {
    
    // determine whether the surface will be drawn above or below 
    // the present data on thecanvas
    ctx.globalCompositeOperation = 'source-over';
    
    ctx.fillStyle = tile.rectColor;
    ctx.beginPath();

      // upper left corner of tile
    ctx.moveTo(tile.tileWidth * y + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth * 2 + mapX + tile.tileWidth * x, tile.d + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
    ctx.lineTo(tile.tileWidth * y  + tile.tileWidth - tile.tileWidth + mapX + tile.tileWidth * x, tile.d + topYsegment);
    ctx.closePath();
    ctx.fill();
    
    // debug mode
    if (state.debug_mode === true) {
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices({tile, x, y});
      drawAdditionalDetails({ctx, rhombusVertices, x, y});
    } 
  }
}