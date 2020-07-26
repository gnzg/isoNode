import drawTileLaterals from '../../maps/drawTileLaterals';
import Tile from '../../tile';
import map from '../../maps/map0';
import RhombusVertices from '../../RhombusVertices';
import drawAdditionalDetails from '../../maps/drawOutlines';

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
          
          // alert('x:' + x + ' y:' + y + ' mapIndex:' + mapIndex);
          let tile = new Tile({ y, x });
          
          let c = mapY - tile.tileWidth * x * 0.5;
          
          // make tile vertices available from this scope
          // establish coordinates for the four vertices of each rhombus
          let rhombusVertices = new RhombusVertices({tile, mapX, mapY, y, x});
          
          drawTileLaterals({
            mapX,
            mapY,
            y,
            x,
            tile,
            rhombusVertices
          });
          // draw vertices; only available in debug mode
          if (state.debug_mode === true) {
            drawAdditionalDetails(state.ctx, rhombusVertices);
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
