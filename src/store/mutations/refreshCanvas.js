import drawIsoMap from '../../maps/drawIsoMap';

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
      for (let mapIndex = 0; mapIndex <= Object.keys(maps).length-1; mapIndex++) {
        let currentMap = Object.keys(maps)[mapIndex];
        // i draws a row across the y axis
        for (let y = 0; y < maps[currentMap].length; y++) {
          // j draws a row across the x axis
          for (let x = 0; x < maps[currentMap][y].length; x++) {
            // draw all three visible sides of the rect aspect
            // logic whether to draw or not to draw shapes is defined in draw()
            drawIsoMap({
              ctx,
              maps,
              mapX,
              mapY,
              tileWidth,
              y,
              x,
              mapIndex: mapIndex,
              rectColors,
              rectShadowColors
            });
          }
        }
      };
    } else {
      console.error("no maps object found!");
    }
  }
  else {
    console.error('No ctx object found!');
  }
}
