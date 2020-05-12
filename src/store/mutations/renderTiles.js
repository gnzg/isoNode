import draw from '../../draw.js';

export default function renderTiles (state) {

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
    
    if (maps !== undefined) {
      
      // loop through our maps
      // maps are drawn layer by layer like on a cake
      
      // iterator y draws the map across the y axis
      for (let y = 0; y <= Object.keys(maps).length-1; y++) {
        let currentMap = Object.keys(maps)[y];
        // iterator i draws a row across the z axis
        for (let z = 0; z < maps[currentMap].length; z++) {
          // iterator j draws a row across the x axis
          for (let x = 0; x < maps[currentMap][z].length; x++) {
            // draw all three visible sides of the rect aspect
            // logic whether to draw or not to draw shapes is defined in draw()
            draw(ctx, maps, mapX, mapY, tileWidth, z, x, y, rectColors, rectShadowColors);
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
