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
      // draw height levels one by one
      // based on z-height, i.e. i
      for (let i = 0; i < state.maxTileHeight; i++) {
        for (let y = 0; y < map.length; y++) {
          for (let x = 0; x < map[y].length; x++) {
            // debugging separate rows and/or columns
            //if ((debugOptions({dimension:y, position:1})
            //|| debugOptions({dimension:y, position:2}) 
            //|| debugOptions({dimension:y, position:3})
            //|| debugOptions({dimension:y, position:4}))
            //&& debugOptions({dimension:x, position:0})
            //&& debugOptions({dimension:y, position:0})
            //) {
              let tile = new Tile({ x, y });
              drawTileLaterals({tile, x, y, i});
              drawTileTop({tile, x, y, i});
            //}
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
}
