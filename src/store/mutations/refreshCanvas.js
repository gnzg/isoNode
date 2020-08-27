import drawTileLaterals from '../../maps/drawTileLaterals';
import drawTileTop from '../../maps/drawTileTop';
import Tile from '../../tile';
import map from '../../maps/map0';
import debugOptions from '../../debugOptions';

export default (state) => {
  
  if (state.ctx) {
    let ctx = state.ctx;
    let {
      clearArea
    } = state.env;
    
    // clear entire canvas
    ctx.clearRect(...clearArea);
    
    
    if (map !== undefined) {
      for (let y = 0; y < map.length; y++) {
        for (let i = 0; i < state.maxTileHeight; i++) {
          for (let x = 0; x < map[y].length; x++) {
            // draw first z level first, then the next one and so on
            // based on z-height
            drawTileLaterals({ tile: new Tile({ x, y }), x, y, z:i });
            drawTileTop({ tile: new Tile({ x, y }), x, y, z:i });
          }
        }
      // debugger;
      }
    } else {
      console.error("no maps object found!");
    }
  }
  else {
    console.error('No ctx object found!');
  }
}
