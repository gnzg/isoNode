import drawTileLaterals from '../../maps/drawTileLaterals';
import drawTileTop from '../../maps/drawTileTop';
import Tile from '../../tile';
import map from '../../maps/map0';
import RhombusVertices from '../../RhombusVertices';
import drawAdditionalDetails from '../../maps/drawOutlines';
import debugOptions from '../../debugOptions';
import createTileHitBoxes from './createTileHitBoxes';
import store from '../../store/index';

export default (state) => {
  
  if (state.ctx) {
    let ctx = state.ctx;
    let {
      mapX,
      mapY,
      clearArea
    } = state.env;
    
    // clear entire canvas
    ctx.clearRect(...clearArea);
    
    // clear tile hitbox array
    state.env.tileHitBoxes = [];
    
    if (map !== undefined) {
      
      for (let y = 0; y < map.length; y++) {
        // j draws a row across the x axis
        for (let x = 0; x < map[y].length; x++) {
          // draw all three visible sides of the rect aspect
          // logic whether to draw or not to draw shapes is defined in draw()
          
          if (
            (debugOptions({dimension:y, position:0}) || debugOptions({dimension:y, position:1}) || debugOptions({dimension:y, position:2}))
            && debugOptions({dimension:x, position:0})
            //&& debugOptions({dimension:y, position:0})
            ) {
              
              // alert('x:' + x + ' y:' + y + ' mapIndex:' + mapIndex);
              let tile = new Tile({ y, x });
              
              // make tile vertices available from this scope
              // establish coordinates for the four vertices of each rhombus
              let rhombusVertices = new RhombusVertices({tile, mapX, mapY, y, x});
              
              //drawTileLaterals({tile, mapX, mapY, x, y});
              
              //drawTileTop({tile, mapX, mapY, x, y});
              
              // build the hitboxes array, but only if the tile is non-zero
              store.dispatch("createTileHitBoxes", ({x, y, rhombusVertices}));
              
              // draw vertices; only available in debug mode
              if (state.debug_mode === true) {
                drawAdditionalDetails(state.ctx, rhombusVertices);
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
