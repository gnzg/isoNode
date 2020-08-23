import state from '../store/state';
import drawLeftTileSide from './drawLeftTileSide';
import drawRightTileSide from './drawRightTileSide';
import tileHeightMap from './tileHeightMap';

/**
* @param Integer x    iterates across a map array
* @param Integer y    iterates across a map array child's elements
* @returns Object canvas
*/

export default ({ tile, x, y, i })  => {

  let map = state.env.map;

  // if the map is defined and the tile is non-zero, draw it
  if (
    map !== undefined &&
    map[y] !== undefined &&
    map[y][x] !== 0 &&
    // draw only the tiles correspond to the current height value i
    tileHeightMap[y][x] === i
    )
    {
      drawLeftTileSide({tile, x, y});
      drawRightTileSide({tile, x, y});

    } else if (map.length == 0) {
      console.error("Length of main map is zero!");   
    }
  }