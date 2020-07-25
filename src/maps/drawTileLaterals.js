import state from '../store/state';
import RhombusVertices from '../RhombusVertices';
import debugOptions from '../debugOptions';
import drawLeftTileSide from './drawLeftTileSide';
import drawRightTileSide from './drawRightTileSide';

/**
* directly manipulates the canvas context found in the state object
*
* @param Object canvas
* @param Integer mapX 
* @param Integer mapY 
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @param Integer mapIndex    iterates across the array of maps
* @param Array rectColors
* @param Array rectShadowColors
* @returns Object canvas
*/

export default ({ctx, maps, mapX, mapY, y, x, mapIndex, tile})  => {
  // operate on a copy of the actual map 

  
  // if the map is defined and the tile is non-zero, draw it
  if (
    tempMap !== undefined &&
    tempMap.length > 0 &&
    tempMap[y] !== undefined &&
    tempMap[y][x] !== 0
    && debugOptions({dimension:mapIndex, position:0}) // draw only first map
    //&& (debugOptions({dimension:y, position:0}) || debugOptions({dimension:y, position:1}) || debugOptions({dimension:y, position:2})) // draw only first map
    )
    {
      
      let c = mapY - tile.tileWidth * x * 0.5;
      let d = tile.tileWidth * 1.5;
      let topYfactor = tile.tileWidth * y * 0.5;
      let topYsegment = c + topYfactor - tile.tileYoffset;
      let mapHeight = maps[1];
      
      // make tile vertices available from this scope
      // establish coordinates for the four vertices of each rhombus
      let rhombusVertices = new RhombusVertices(tile.tileWidth, mapX, y, x, d, topYsegment);
      
      // build the hitboxes array
      state.env.tileHitBoxes.push({ 
        // rhombus vertices
        ...rhombusVertices,
        // coordinates respective to the maps object
        x,
        mapIndex,
        y
      });
      
      drawLeftTileSide({ctx, tempMap, mapHeight, tile, mapX, y, x, d, c, fillColor});
      drawRightTileSide({ctx, tempMap, mapHeight, tile, mapX, y, x, d, c, fillColor});
    }
  }