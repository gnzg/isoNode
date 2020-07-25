import drawTileLaterals from '../../maps/drawTileLaterals';
import Tile from '../../tile';

export default (state, refreshArea = undefined) => {
  
  if (state.ctx) {
    let ctx = state.ctx;
    let {
      maps,
      tileWidth,
      mapX,
      mapY,
      rectColors,
      rectShadowColors,
      clearArea
    } = state.env;
    // TODO: Add prevalance of elevated tiles if they rise above other tiles
    
    // clear entire canvas
    ctx.clearRect(...clearArea);
    
    // clear tile hitbox array
    state.env.tileHitBoxes = [];
    
    if (maps !== undefined) {
      
      // loop through our maps
      // maps are drawn layer by layer like on a cake
      
      // mapIndex draws the map across the y axis
      let currentMap = maps[0];
      
      // i draws a row across the y axis
      for (let y = 0; y < currentMap.length; y++) {
        // j draws a row across the x axis
        for (let x = 0; x < currentMap[y].length; x++) {
          // draw all three visible sides of the rect aspect
          // logic whether to draw or not to draw shapes is defined in draw()
          
          // alert('x:' + x + ' y:' + y + ' mapIndex:' + mapIndex);

          let tempMap = maps[0];
          let fillColor = rectShadowColors[tempMap[y][x]];
          
          let tile = new Tile({
            mapIndex: 0, 
            y, x,
            tileWidth,
            style: null,
            rectColor: rectColors[rectShadowColors.indexOf(fillColor)],
            rectShadowColors
          });

          drawTileLaterals({
            ctx,
            maps,
            mapX,
            mapY,
            tileWidth,
            y,
            x,
            mapIndex: 0,
            rectColors,
            rectShadowColors,
            tile
          });
        }
      }
      for (let i = 0; i < 3; i++) {
        for (let y = 0; y < currentMap.length; y++) {
          for (let x = 0; x < currentMap[y].length; x++) {
            drawTileTop({ctx, tempMap: maps[0], mapHeight: maps[1], tile, mapX, y, x, d, i, state, topYsegment, rhombusVertices});
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
