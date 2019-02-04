import Tile from './tile';

const renderTiles = (env) => {
  
  let { map, waterWorld, tileW, mapX, mapY, ctx, rectColors, rectShadowColors } = env;
  // TODO: Add prevalance of elevated tiles if they rise above other tiles
  
  // clear entire canvas
  ctx.clearRect(-1000, -1000,  4000,  4000);
  
  if (map[0] !== undefined) {
    // loop through our map and draw out the image represented by the number.
    // iterator k draws the map across the y axis
    for (let k = 1; k < 2; k++) { 
        // iterator i draws a row across the z axis
        for (let i = 0; i < map.length; i++) {
          // iterator j draws a row across the x axis
          for (let j = 0; j < map[i].length; j++) { 
              // draw all three visible sides of the rect aspect
              
              let mapTile = new Tile({
                i:i,
                j:j,
                k:k,
                tileW:tileW,
                mapX:mapX,
                mapY:mapY,
                map:map,
                rectColors:rectColors,
                rectShadowColors:rectShadowColors,
                waterWorld:waterWorld,
              });

              mapTile.draw(ctx);

          }
        }
      };
      console.log('i', map.length, 'j', map[0].length);
    }
  }
  export default renderTiles;