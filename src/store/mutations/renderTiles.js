import { draw } from '../../utils';

export default function renderTiles (state) {
  

  if (state.ctx) {
      let ctx = state.ctx;
      let {
        maps,
        tileW,
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
        // loop through our map and draw out the image represented by the number.
        // iterator k draws the map across the y axis
        for (let k = 0; k <= Object.keys(maps).length-1; k++) {
          let currentMap = Object.keys(maps)[k];
          // iterator i draws a row across the z axis
          for (let i = 0; i < maps[currentMap].length; i++) {
            // iterator j draws a row across the x axis
            for (let j = 0; j < maps[currentMap][i].length; j++) {

              // draw all three visible sides of the rect aspect
              // logic whether to draw or not to draw shapes is defined in draw()
              draw(ctx, maps, mapX, mapY, tileW, i, j, k, rectColors, rectShadowColors);
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
