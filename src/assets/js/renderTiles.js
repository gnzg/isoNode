import Tile from './tile';

const renderMap = (env) => {

  let { tileGraphics, map, waterWorld, tileW, tileH, mapX, mapY, ctx, mode, rectColors, rectShadowColors } = env;
  // TODO: Add prevalance of elevated tiles if they rise above other tiles
  
  // clear entire canvas
  ctx.clearRect(-1000, -1000,  4000,  4000);
  
  // loop through our map and draw out the image represented by the number.
  // iterator k draws the map across the y axis
  for (let k = 0; k < 9; k++) { 
      // iterator i draws a row across the z axis
      for (let i = 0; i < map.length; i++) {
        // iterator j draws a row across the x axis
        // map[i].length
        for (let j = 0; j < map[i].length; j++) {

          //tileYoffset = env.tileH + 4;
          //fillColor = 'red';
          
          //tileYheight= 32 * (map[i][j] === 0 ? 1 : map[i][j]);
          // to make sure tiles are drawn upwards and not downwards
          //tileYoffset = 32 * (map[i][j] === 0 ? 1 : map[i][j]);
         
  
            // draw all three visible sides of the rect aspect
            
            let mapTile = new Tile({i:i, j:j, k:k, tileW:tileW, mapX:mapX, mapY:mapY, map:map, rectColors:rectColors, rectShadowColors:rectShadowColors, waterWorld:waterWorld});

            mapTile.draw(ctx);
            
        }
      }
    };
  }
  export default renderMap;