import state from '../store/state';
import RhombusVertices from '../RhombusVertices';
import Tile from '../tile';
import debugOptions from '../debugOptions';
import drawLeftTileSide from './drawLeftTileSide';
import drawRightTileSide from './drawRightTileSide';
import drawTopTileSide from './drawTopTileSide';

/**
* directly manipulates the canvas context found in the state object
*
* @param Object canvas
* @param Array maps
* @param Integer mapX 
* @param Integer mapY 
* @param Integer tileWidth 
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @param Integer mapIndex    iterates across the array of maps
* @param Array rectColors
* @param Array rectShadowColors
* @returns Object canvas
*/

export default ({ctx, maps, mapX, mapY, tileWidth, y, x, mapIndex, rectColors, rectShadowColors})  => {
  // operate on a copy of the actual map 
  let tempMap = maps[0];
  let fillColor = rectShadowColors[tempMap[y][x]];
  
  // alert('x:' + x + ' y:' + y + ' mapIndex:' + mapIndex);
  
  let tile = new Tile({
    mapIndex, 
    y, x,
    tileWidth,
    style: null,
    rectColor: rectColors[rectShadowColors.indexOf(fillColor)],
    rectShadowColors,
    tileYoffset: tileWidth * mapIndex * 1.25 + maps[1][y][x]*10
  });
  
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
      drawTopTileSide({ctx, tempMap, mapHeight, tile, mapX, y, x, d, c, state, topYsegment, rhombusVertices});
     
    }
  }