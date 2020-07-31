import drawTileLaterals from '../../maps/drawTileLaterals';
import drawTileTop from '../../maps/drawTileTop';
import Tile from '../../tile';
import map from '../../maps/map0';
import RhombusVertices from '../../RhombusVertices';
import drawAdditionalDetails from '../../maps/drawOutlines';
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
        // j draws a row across the x axis
        for (let x = 0; x < map[y].length; x++) {
          // draw all three visible sides of the rect aspect
          // logic whether to draw or not to draw shapes is defined in draw()
          
          if (
            (debugOptions({dimension:y, position:1}) || debugOptions({dimension:y, position:2}) || debugOptions({dimension:y, position:3})  || debugOptions({dimension:y, position:4}))
            //&& debugOptions({dimension:x, position:0})
            //&& debugOptions({dimension:y, position:0})
            ) {
              
              let tile = new Tile({ x, y });
              
              drawTileLaterals({tile, x, y});
              
              drawTileTop({tile, x, y});
              
              // draw vertices; only available in debug mode
              if (state.debug_mode === true) {
                // make tile vertices available from this scope
                // establish coordinates for the four vertices of each rhombus
                let rhombusVertices = new RhombusVertices({tile, x, y});
                drawAdditionalDetails({ctx, rhombusVertices, x, y});
              } 
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
