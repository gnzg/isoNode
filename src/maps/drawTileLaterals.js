import state from '../store/state';
import RhombusVertices from '../RhombusVertices';
import debugOptions from '../debugOptions';
import drawLeftTileSide from './drawLeftTileSide';
import drawRightTileSide from './drawRightTileSide';
import heightMap from '../maps/tileHeightMap';

/**
* directly manipulates the canvas context found in the state object
*
* @param Object canvas
* @param Integer mapX 
* @param Integer mapY 
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @param Integer mapIndex    iterates across the array of maps
* @param Array rectShadowColors
* @returns Object canvas
*/

export default ({ctx, map, mapX, mapY, y, x, mapIndex, tile})  => {
  // if the map is defined and the tile is non-zero, draw it
  if (
    map !== undefined &&
    map[y] !== undefined &&
    map[y][x] !== 0
    && debugOptions({dimension:mapIndex, position:0}) // draw only first map
    //&& (debugOptions({dimension:y, position:0}) || debugOptions({dimension:y, position:1}) || debugOptions({dimension:y, position:2})) // draw only first map
    )
    {
      
      let c = mapY - tile.tileWidth * x * 0.5;
      let d = tile.tileWidth * 1.5;
      let topYfactor = tile.tileWidth * y * 0.5;
      let topYsegment = c + topYfactor - tile.tileYoffset;
      
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
      
      drawLeftTileSide({tile, mapX, y, x, d, c});
      drawRightTileSide({tile, mapX, y, x, d, c});
      
    } else if (map.length == 0) {
      console.error("Length of main map is zero!");   
    }
  }