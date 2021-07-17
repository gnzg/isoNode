import drawTileLaterals from '../../maps/drawTileLaterals.ts';
import drawTileTop from '../../maps/drawTileTop';
import Tile from '../../objects/tile.ts';

// import debugOptions from '../../debugOptions';

export default (state) => {
  if (state.ctx) {
    let ctx = state.ctx;
    let {
      clearArea,
      map_tiles
    } = state.env;

    // clear entire canvas
    ctx.clearRect(...clearArea);
    
    if (map_tiles !== undefined && Array.isArray(map_tiles)) {
      for (let y = 0; y < map_tiles.length; y++) { // for each row
        for (let i = 0; i < state.maxTileHeight; i++) { // for each tile height
          for (let x = 0; x < map_tiles[y].length; x++) {   // for each tile element
            drawTileLaterals( new Tile({ x, y, z: i }) );
            drawTileTop( new Tile({ x, y, z: i }) );
          }
        }
      }
    } else {
      console.error("no maps object found!");
    }
  }
  else {
    console.error('No ctx object found!');
  }
};
