import state from './store/state';
import RhombusVertices from './RhombusVertices';
import Tile from './tile';
import drawAdditionalDetails from './drawAdditionalDetails';
import debugOptions from './debugOptions';

/**
* directly manipulates the canvas context found in the state object
*
* @param Object canvas
* @param Array maps
* @param Integer mapX 
* @param Integer mapY 
* @param Integer tileWidth 
* @param Integer x    iterates across a map array
* @param Integer z    iterates across a map array child's elements
* @param Integer y    iterates across the array of maps
* @param Array rectColors
* @param Array rectShadowColors
* @returns Object canvas
*/

export default ({ctx, maps, mapX, mapY, tileWidth, z, x, y, rectColors, rectShadowColors})  => {
  // operate on a copy of the actual map 
  let tempMap = maps[`${Object.keys(maps)[y]}`];
  let fillColor = rectShadowColors[tempMap[z][x]];
  
  let tile = new Tile({
    y, z, x,
    tileWidth,
    style: null,
    rectColor: rectColors[rectShadowColors.indexOf(fillColor)],
    rectShadowColors,
    tileYoffset: tileWidth * y * 1.25 + maps[1][z][x]*10
  });
  
  // if the map is defined and the tile is non-zero, draw it
  if (
    tempMap !== undefined &&
    tempMap.length > 0 &&
    tempMap[z] !== undefined &&
    tempMap[z][x] !== 0
    && debugOptions({dimension:y, position:0}) // draw only first map
    && (debugOptions({dimension:z, position:1}) // draw only first map
    || debugOptions({dimension:z, position:2})) // draw only first map
    )
    {
      
      let c = mapY - tile.tileWidth * x * 0.5;
      let d = tile.tileWidth * 1.5;
      let topYfactor = tile.tileWidth * z * 0.5;
      let topYsegment = c + topYfactor - tile.tileYoffset;
      
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices(tile.tileWidth, mapX, z, x, d, topYsegment);
      
      // build the hitboxes array
      state.env.tileHitBoxes.push({ 
        // rhombus vertices
        ...rhombusVertices,
        // coordinates respective to the maps object
        x,
        y,
        z
      });
      
      ctx.fillStyle = tile.rectColor;
      
      // top
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.moveTo(tile.tileWidth * z + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth + topYsegment);
      ctx.lineTo(tile.tileWidth * z  + tile.tileWidth * 2 + mapX + tile.tileWidth * x, d + topYsegment);
      ctx.lineTo(tile.tileWidth * z  + tile.tileWidth + mapX + tile.tileWidth * x, tile.tileWidth * 2 + topYsegment);
      ctx.lineTo(tile.tileWidth * z  + tile.tileWidth - tile.tileWidth + mapX + tile.tileWidth * x, d + topYsegment);
      ctx.closePath();
      ctx.fill();
      
      // left
      // draw only if NOT preceeded by a tile on the z axis, or if first tile
      if (tempMap[z][x - 1] !== 1 || x === 0) {
        

        ctx.globalCompositeOperation = 'destination-over';


        if (x === 0) ctx.globalCompositeOperation = 'source-over';
        if (x - 1 >= 0 && tempMap[z][x - 1] === 0) ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(tile.tileWidth * z  + mapX + tile.tileWidth * x, c + tile.tileWidth * z  + d - z* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.lineTo(tile.tileWidth * z  + mapX + tile.tileWidth * x, c + tile.tileWidth * z  + tile.tileWidth + tile.tileWidth * 1.75 - z* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.lineTo(tile.tileWidth * z  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * z  + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - z* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.lineTo(tile.tileWidth * z  + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * z  + d + tile.tileWidth * 0.5 - z* tile.tileWidth * 0.5 - tile.tileYoffset);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      
      // right
      // draw only if NOT preceeded by a tile on the x axis, or if iterating over the last row across the z axis
      if (tempMap[z  + 1] !== undefined && tempMap[z  + 1][x] !== 1 ||
        z=== tempMap.length - 1) {
          ctx.globalCompositeOperation = 'source-over';
          if (z< tempMap.length - 1 && tempMap[z + 1][x] !== 0) ctx.globalCompositeOperation = 'destination-over';
          ctx.beginPath();
          ctx.moveTo(tile.tileWidth * z + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * z + d - z * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tile.tileWidth * z + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * z + tile.tileWidth + tile.tileWidth * 1.75 - z * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tile.tileWidth * z + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * z + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - z * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.lineTo(tile.tileWidth * z + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * z + d + tile.tileWidth * 0.5 - z * tile.tileWidth * 0.5 - tile.tileYoffset);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
        }
        
        // draw vertices; only available in debug mode
        if (state.debug_mode) {
          drawAdditionalDetails(ctx, rhombusVertices);
        }
      }
    }