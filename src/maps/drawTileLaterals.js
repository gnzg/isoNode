import state from '../store/state';
import drawLeftTileSide from './drawLeftTileSide';
import drawRightTileSide from './drawRightTileSide';

/**
* directly manipulates the canvas context found in the state object
*
* @param Integer mapX 
* @param Integer mapY 
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @param Array rectShadowColors
* @returns Object canvas
*/

export default ({ mapX, mapY, y, x, tile})  => {

  let map = state.env.map;
  // if the map is defined and the tile is non-zero, draw it
  if (
    map !== undefined &&
    map[y] !== undefined &&
    map[y][x] !== 0
    )
    {
      
      let c = mapY - tile.tileWidth * x * 0.5;
      let d = tile.tileWidth * 1.5;
      
      drawLeftTileSide({tile, mapX, y, x, d, c});
      drawRightTileSide({tile, mapX, y, x, d, c});

    } else if (map.length == 0) {
      console.error("Length of main map is zero!");   
    }
  }