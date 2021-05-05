import Tile from '../atoms/tile';
import state from '../store/state';
import drawLeftTileSide from './drawLeftTileSide';
import drawRightTileSide from './drawRightTileSide';
import tileHeightMap from './tileHeightMap';

export default ( tile : Tile )  => {

  const x : number = tile.x;
  const y : number = tile.y;
  const z : number = tile.z;

  let map = state.env.map;

  // if the map is defined and the tile is non-zero, draw it
  if (
    map !== undefined &&
    map[y] !== undefined &&
    map[y][x] !== 0 &&
    // draw only the tiles correspond to the current height value i
    tileHeightMap[y][x] === z
    )
    {
      drawLeftTileSide( tile );
      drawRightTileSide( tile );

    } else if (map.length == 0) {
      console.error("Length of main map is zero!");   
    }
  };